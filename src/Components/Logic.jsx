import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ScoreProgress from "./ScoreProgress";

import preloader from "../assets/preloader_gif.gif";
import RenderFetchedReport from "./RenderFetchedReport";
import PDFGenerator from "./PDFGenerator";

const Logic = ({ url }) => {
  const { id } = useParams();
  // Initialize
  const [mobileData, setMobileData] = useState(null);
  const [desktopData, setDesktopData] = useState(null);
  const [loadingText, setLoadingText] = useState(
    "Establishing a connection with PageSpeed Insights..."
  );
  const [view, setView] = useState("mobile"); // Default view is mobile

  const [mobilePerformanceScore, setMobilePerformanceScore] = useState(null);
  const [desktopPerformanceScore, setDesktopPerformanceScore] = useState(null);
  const [mobileSeoScore, setMobileSeoScore] = useState(null);
  const [desktopSeoScore, setDesktopSeoScore] = useState(null);
  const [mobileAccessibilityScore, setMobileAccessibilityScore] =
    useState(null);
  const [desktopAccessibilityScore, setDesktopAccessibilityScore] =
    useState(null);

  const [hasPosted, setHasPosted] = useState(false); // Add state to track post status
  const [fetchedReport, setFetchedReport] = useState(null);
  // const debounceTimeout = useRef(null);

  // fetch saved data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`https://web-vitals-hq-backend.vercel.app/api/report/${id}`);
        // console.log("res.data", res.data.report);
        setFetchedReport(res.data.report);
      } catch (err) {
        console.error("Failed to fetch report: ", err);
      }
    };
    fetchReport();
  }, []);

  // called when URL changes
  useEffect(() => {
    // function to fetch data from Pagespeed Insights
    const fetchPagespeedData = async (device) => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const API_URL =
        "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
      const requestUrl = `${API_URL}?url=${url}&strategy=${device}&category=performance&category=accessibility&category=seo&key=${API_KEY}`;

      try {
        const response = await axios.get(requestUrl);
        const performanceScore = Math.ceil(
          response.data.lighthouseResult.categories.performance.score * 100
        );
        const seoScore = Math.ceil(
          response.data.lighthouseResult.categories.seo.score * 100
        );
        const accessibilityScore = Math.ceil(
          response.data.lighthouseResult.categories.accessibility.score * 100
        );

        return {
          audits: response.data.lighthouseResult.audits,
          performanceScore: performanceScore,
          seoScore: seoScore,
          accessibilityScore: accessibilityScore,
        };
      } catch (error) {
        console.error("Error fetching PageSpeed data", error);
        return null;
      }
    };
    // function to fetch data for mobile and desktop simultaneously
    const fetchData = async () => {
      if (hasPosted) return; // Prevent posting again if already posted
      // Use Promise.all to fetch mobile and desktop data concurrently
      const [mobileDataResponse, desktopDataResponse] = await Promise.all([
        fetchPagespeedData("mobile"),
        fetchPagespeedData("desktop"),
      ]);

      // Set the states based on the responses
      if (mobileDataResponse) {
        setMobileData(mobileDataResponse.audits);
        setMobilePerformanceScore(mobileDataResponse.performanceScore);
        setMobileAccessibilityScore(mobileDataResponse.accessibilityScore);
        setMobileSeoScore(mobileDataResponse.seoScore);
      }
      if (desktopDataResponse) {
        setDesktopData(desktopDataResponse.audits);
        setDesktopPerformanceScore(desktopDataResponse.performanceScore);
        setDesktopAccessibilityScore(desktopDataResponse.accessibilityScore);
        setDesktopSeoScore(desktopDataResponse.seoScore);
      }
    };

    fetchData();
    // text messages to display while page is loading
    const textMessages = [
      "Establishing a connection with PageSpeed Insights...",
      "Success! Connection established ✅",
      "Retrieving core web vitals and performance metrics 📊",
      "Hang tight, this may take a moment ⏳",
      "Almost there! Preparing data 🛠️",
      "Generating results... 🚀",
      "Generating results... 🚀",
      "We ran into an error. Please reload the page or try again later 🔴",
    ];

    let index = 0;
    const intervalId = setInterval(() => {
      setLoadingText(textMessages[index]);
      index = (index + 1) % textMessages.length;
    }, 4000); // Update every 4 seconds

    // Clear interval once the data is fetched
    return () => clearInterval(intervalId);
  }, [url, hasPosted]);

  // function to get the values of each metric
  const getMetricValue = (metric) => {
    return metric && metric.displayValue ? metric.displayValue : "N/A";
  };
  // function to get the status of each metric
  const getMetricStatus = (metric, name) => {
    if (!metric || !metric.displayValue) return "N/A";

    const value = parseFloat(metric.displayValue);

    switch (name) {
      case "LCP":
        if (value <= 2.5) return "Good";
        if (value > 2.5 && value <= 4.0) return "Needs Improvement";
        return "Poor";
      case "FCP":
        if (value <= 1.8) return "Good";
        if (value > 1.8 && value <= 3.0) return "Needs Improvement";
        return "Poor";
      case "FID":
        if (value <= 100) return "Good";
        if (value > 100 && value <= 300) return "Needs Improvement";
        return "Poor";
      case "CLS":
        if (value <= 0.1) return "Good";
        if (value > 0.1 && value <= 0.25) return "Needs Improvement";
        return "Poor";
      case "Speed Index":
        if (value <= 3.4) return "Good";
        if (value > 3.4 && value <= 5.8) return "Needs Improvement";
        return "Poor";
      case "TBT":
        if (value <= 200) return "Good";
        if (value > 200 && value <= 600) return "Needs Improvement";
        return "Poor";
      default:
        return "Needs Improvement";
    }
  };

  // handle icons/classnames
  const getStatusClass = (status) => {
    switch (status) {
      case "Good":
        return "status-good";
      case "Needs Improvement":
        return "status-warning";
      case "Poor":
        return "status-poor";
      default:
        return "";
    }
  };

  // Function to post the report data to the DB
  const postData = async () => {
    if (!mobileData || !desktopData || hasPosted) return; // Only post if data is available and hasn't been posted already

    const reportData = {
      url,
      scores: {
        mobile: {
          performance: mobilePerformanceScore,
          accessibility: mobileAccessibilityScore,
          seo: mobileSeoScore,
        },
        desktop: {
          performance: desktopPerformanceScore,
          accessibility: desktopAccessibilityScore,
          seo: desktopSeoScore,
        },
      },
      metrics: {
        mobile: {
          FCP: {
            value: mobileData["first-contentful-paint"].displayValue,
            status: getMetricStatus(
              mobileData["first-contentful-paint"],
              "FCP"
            ),
          },
          LCP: {
            value: mobileData["largest-contentful-paint"].displayValue,
            status: getMetricStatus(
              mobileData["largest-contentful-paint"],
              "LCP"
            ),
          },
          FID: {
            value: mobileData["max-potential-fid"].displayValue,
            status: getMetricStatus(mobileData["max-potential-fid"], "FID"),
          },
          CLS: {
            value: mobileData["cumulative-layout-shift"].displayValue,
            status: getMetricStatus(
              mobileData["cumulative-layout-shift"],
              "CLS"
            ),
          },
          speedIndex: {
            value: mobileData["speed-index"].displayValue,
            status: getMetricStatus(mobileData["speed-index"], "Speed Index"),
          },
          TBT: {
            value: mobileData["total-blocking-time"].displayValue,
            status: getMetricStatus(mobileData["total-blocking-time"], "TBT"),
          },
        },
        desktop: {
          FCP: {
            value: desktopData["first-contentful-paint"].displayValue,
            status: getMetricStatus(
              desktopData["first-contentful-paint"],
              "FCP"
            ),
          },
          LCP: {
            value: desktopData["largest-contentful-paint"].displayValue,
            status: getMetricStatus(
              desktopData["largest-contentful-paint"],
              "LCP"
            ),
          },
          FID: {
            value: desktopData["max-potential-fid"].displayValue,
            status: getMetricStatus(desktopData["max-potential-fid"], "FID"),
          },
          CLS: {
            value: desktopData["cumulative-layout-shift"].displayValue,
            status: getMetricStatus(
              desktopData["cumulative-layout-shift"],
              "CLS"
            ),
          },
          speedIndex: {
            value: desktopData["speed-index"].displayValue,
            status: getMetricStatus(desktopData["speed-index"], "Speed Index"),
          },
          TBT: {
            value: desktopData["total-blocking-time"].displayValue,
            status: getMetricStatus(desktopData["total-blocking-time"], "TBT"),
          },
        },
      },
    };

    try {
      const response = await axios.post(
        "https://web-vitals-hq-backend.vercel.app/api/report",
        reportData
      );
      // console.log("Data successfully posted:", response.data);
      setHasPosted(true); // Mark data as posted
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // Trigger postData once the data is fetched and ready
  useEffect(() => {
    if (mobileData && desktopData && !hasPosted) {
      postData(); // Call the postData function once the data is ready
      setHasPosted(true);
    }
  }, [mobileData, desktopData, hasPosted]);

  // useEffect(() => {
  //   if (mobileData && desktopData && !hasPosted) {
  //     // clearTimeout(debounceTimeout.current);
  //     // debounceTimeout.current = setTimeout(() => {
  //     postData();
  //     // }, 5000); // Wait for 2 seconds after the data has stabilized
  //   }
  // }, [mobileData, desktopData]);

  // function to generate PDF
  const generatePDF = () => {
    // use imported pdf generator
    PDFGenerator({
      url,
      view,
      mobileData,
      desktopData,
      mobilePerformanceScore,
      desktopPerformanceScore,
      mobileSeoScore,
      desktopSeoScore,
      mobileAccessibilityScore,
      desktopAccessibilityScore,
      getMetricValue,
      getMetricStatus,
    });
  };

  // function to render the data per device

  const renderDeviceData = (
    device,
    deviceData,
    performanceScore,
    seoScore,
    accessibilityScore
  ) => {
    return (
      <>
        <h2 className="deviceName">Current {device} Metrics</h2>
        {/* performance, seo and accessibility scores*/}
        <ScoreProgress
          performanceScore={performanceScore}
          seoScore={seoScore}
          accessibilityScore={accessibilityScore}
        />
        {/* table */}
        <table>
          <thead>
            <tr>
              <th>Core Web Vitals / Metrics</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Largest contentful paint */}
            <tr>
              <td>
                <i
                  className={`fas fa-tachometer-alt ${getStatusClass(
                    getMetricStatus(
                      deviceData["largest-contentful-paint"],
                      "LCP"
                    )
                  )}`}
                ></i>
                Largest Contentful Paint (LCP)
              </td>
              <td>{getMetricValue(deviceData["largest-contentful-paint"])}</td>
              <td>
                {getMetricStatus(deviceData["largest-contentful-paint"], "LCP")}
              </td>
            </tr>
            {/* First contentful paint */}
            <tr>
              <td>
                <i
                  className={`fas fa-tachometer-alt ${getStatusClass(
                    getMetricStatus(deviceData["first-contentful-paint"], "FCP")
                  )}`}
                ></i>
                First Contentful Paint (FCP)
              </td>
              <td>{getMetricValue(deviceData["first-contentful-paint"])}</td>
              <td>
                {getMetricStatus(deviceData["first-contentful-paint"], "FCP")}
              </td>
            </tr>
            {/* First input delay */}
            <tr>
              <td>
                <i
                  className={`fas fa-bolt ${getStatusClass(
                    getMetricStatus(deviceData["max-potential-fid"], "FID")
                  )}`}
                ></i>
                First Input Delay (FID)
              </td>
              <td>{getMetricValue(deviceData["max-potential-fid"])}</td>
              <td>{getMetricStatus(deviceData["max-potential-fid"], "FID")}</td>
            </tr>
            {/* Cumulative layout shift */}
            <tr>
              <td>
                <i
                  className={`fas fa-image ${getStatusClass(
                    getMetricStatus(
                      deviceData["cumulative-layout-shift"],
                      "CLS"
                    )
                  )}`}
                ></i>
                Cumulative Layout Shift (CLS)
              </td>
              <td>{getMetricValue(deviceData["cumulative-layout-shift"])}</td>
              <td>
                {getMetricStatus(deviceData["cumulative-layout-shift"], "CLS")}
              </td>
            </tr>
            {/* speed index */}
            <tr>
              <td>
                <i
                  className={`fas fa-rocket ${getStatusClass(
                    getMetricStatus(deviceData["speed-index"], "Speed Index")
                  )}`}
                ></i>
                Speed Index
              </td>
              <td>{getMetricValue(deviceData["speed-index"])}</td>
              <td>
                {getMetricStatus(deviceData["speed-index"], "Speed Index")}
              </td>
            </tr>
            {/* total blocking time */}
            <tr>
              <td>
                <i
                  className={`fas fa-pause-circle ${getStatusClass(
                    getMetricStatus(deviceData["total-blocking-time"], "TBT")
                  )}`}
                ></i>
                Total Blocking Time (TBT)
              </td>
              <td>{getMetricValue(deviceData["total-blocking-time"])}</td>
              <td>
                {getMetricStatus(deviceData["total-blocking-time"], "TBT")}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };
  // render all
  return (
    <main className="vitalsPage">
      {!mobileData || !desktopData ? (
        <div className="preloader-container">
          <img src={preloader} alt="preloader" />
          <p>{loadingText}</p>
        </div>
      ) : (
        <>
          <div className="toggle-buttons">
            <button
              className={`button ${view === "mobile" ? "mobile-active" : ""}`}
              onClick={() => setView("mobile")}
              disabled={view === "mobile"}
            >
              Mobile
            </button>
            <button
              className={`button ${view === "desktop" ? "desktop-active" : ""}`}
              onClick={() => setView("desktop")}
              disabled={view === "desktop"}
            >
              Desktop
            </button>
          </div>

          {/* Render data for the selected device */}
          {view === "mobile" &&
            renderDeviceData(
              "Mobile",
              mobileData,
              mobilePerformanceScore,
              mobileSeoScore,
              mobileAccessibilityScore
            )}
          {view === "desktop" &&
            renderDeviceData(
              "Desktop",
              desktopData,
              desktopPerformanceScore,
              desktopSeoScore,
              desktopAccessibilityScore
            )}
          {/* Add Button for PDF Download */}
          {/* <button onClick={generatePDF}>Download PDF</button> */}
          {/* PDF Download Button */}
          <button className="pdf_btn" onClick={generatePDF}>Download PDF</button>

          {/* Render fetched report data */}
          <div className="fetched_report_sect">
            <RenderFetchedReport
              fetchedReport={fetchedReport}
              view={view}
              getStatusClass={getStatusClass}
              getMetricStatus={getMetricStatus}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Logic;
