import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import toast from "react-hot-toast";

import {
  ScoreBlock,
  MetricsBlock,
  getStatusColor,
  renderVital,
} from "../Components/ResultsBlock";
import ScoreProgress from "../Components/ScoreProgress";
import preloader from "../assets/preloader_gif.gif";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [report, setReport] = useState(null);
  const [latestReport, setLatestReport] = useState(null);
  const [view, setView] = useState("mobile");

  const navigate = useNavigate();

  useEffect(() => {
    // fetch report from API
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
        );
        if (res.data.success) {
          setReport(res.data.report);
          setLatestReport(res.data.report.reports?.at(-1));
        } else {
          toast.error("No report found for this URL.");
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        toast.error("An unexepected error occurred. Plesae try again later.");
      }
    };

    if (url) fetchReport();
  }, [url]);

  // 2. Safely memoize values only when report is available
  const memoizedData = useMemo(() => {
    if (!report) return {};

    const {
      scores: { mobile, desktop },
      metrics: { mobile: mobileMetrics, desktop: desktopMetrics },
      suggestions: { mobile: mobileSuggestions, desktop: desktopSuggestions },
    } = latestReport;

    const isMobile = view === "mobile";

    return {
      deviceData: isMobile ? mobileMetrics : desktopMetrics,
      performanceScore: isMobile ? mobile.performance : desktop.performance,
      seoScore: isMobile ? mobile.seo : desktop.seo,
      accessibilityScore: isMobile
        ? mobile.accessibility
        : desktop.accessibility,
      bestPracticesScore: isMobile
        ? mobile.bestPractices
        : desktop.bestPractices,
      suggestions: isMobile ? mobileSuggestions : desktopSuggestions,
    };
  }, [latestReport, view]);

  if (!latestReport)
    return (
      <div className="preloader_div flex justify-center items-center h-screen bg-gray-50">
        <img src={preloader} alt="preloader" className="" />
      </div>
    );

  const {
    deviceData,
    performanceScore,
    seoScore,
    accessibilityScore,
    bestPracticesScore,
    suggestions,
  } = memoizedData;

  // opportunity status
  const getOpportunityStatus = (score) => {
    if (score >= 0.9) return "good";
    if (score >= 0.5) return "average";
    return "poor";
  };

  return (
    <main className="min-h-screen bg-gray-50 relative" role="main">
      <div className="m-10 p-5 sm:p-10 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <section className="sticky top-0 z-[50] bg-gray-100 border-b border-gray-300 shadow-sm">
          <div className="flex flex-col lg:flex-row md:justify-center lg:justify-between items-center gap-4 px-6 py-3">
            {/* url */}
            <h2 className="font-semibold text-lg text-gray-800 underline truncate max-w-[80vw]">
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                title={report.url}
                aria-label={`Open ${report.url} in a new tab`}
                className="hover:text-orange-400 hover:italic"
              >
                {report.url}
              </a>
            </h2>
            {/* previous reports */}
            <button
              onClick={() => {
                navigate(
                  `/previous-reports?url=${encodeURIComponent(report.url)}`
                );
              }}
              className="bg-gray-200 text-gray-700 transition-shadow hover:shadow-md hover:bg-orange-400 hover:text-white cursor-pointer px-5 py-2 mt-2"
            >
              View Previous Reports
            </button>
            <div className="flex gap-2 p-1 rounded-lg bg-gray-100 shadow-inner position-fixed">
              <button
                aria-label="View mobile report"
                aria-pressed={view === "mobile"}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  view === "mobile"
                    ? "bg-green-600 text-white hover:cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 transition-shadow hover:shadow-md hover:bg-orange-400 hover:text-white cursor-pointer"
                }`}
                onClick={() => setView("mobile")}
              >
                Mobile
              </button>
              <button
                aria-label="View desktop report"
                aria-pressed={view === "desktop"}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  view === "desktop"
                    ? "bg-green-600 text-white hover:cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 transition-shadow hover:shadow-md hover:bg-orange-400 hover:text-white cursor-pointer"
                }`}
                onClick={() => setView("desktop")}
              >
                Desktop
              </button>
            </div>
          </div>
        </section>

        {/* Score progress and core web vitals */}
        <section className="mt-10 gap-3 flex md:items-center justify-between lg:px-20 flex-col md:flex-row p-5 bg-gray-50 rounded-xl shadow-sm space-y-4">
          <div
            className="w-24 text-center transition-transform duration-200 hover:scale-[1.02]"
            role="progressbar"
            aria-valuenow={performanceScore}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <ScoreProgress performanceScore={performanceScore} />
          </div>
          <div>
            <h4 className="underline my-2 text-sm font-semibold">
              Core Web Vitals
            </h4>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="p-3 rounded-md bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[0.90] duration-200">
                {renderVital(
                  "LCP",
                  "Largest Contentful Paint",
                  getStatusColor,
                  deviceData
                )}
              </div>
              <div className="p-3 rounded-md bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[0.90] duration-200">
                {renderVital(
                  "First Input Delay",
                  "First Input Delay",
                  getStatusColor,
                  deviceData
                )}
              </div>
              <div className="p-3 rounded-md bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[0.90] duration-200">
                {renderVital(
                  "Cumulative Layout Shift",
                  "Cumulative Layout Shift",
                  getStatusColor,
                  deviceData
                )}
              </div>
            </div>
          </div>
        </section>
        {/* <hr className="text-gray-200 my-5" /> */}
        {/* Metrics block */}
        <section className="bg-white mt-8 p-6 rounded-xl shadow-sm">
          <MetricsBlock title={`METRICS`} metrics={deviceData} />
        </section>
        {/* <hr className="text-gray-200 mt-10" /> */}

        {/* Opportunities */}
        <section
          className="p-2 mt-8 md:p-5"
          aria-labelledby="opportunities-title"
        >
          <h4 id="opportunities-title" className="font-bold my-4">
            Performance Improvement Opportunities
          </h4>
          <p className="text-sm mb-3">
            Below are actionable suggestions generated from your page's
            performance audit. Addressing these can significantly reduce load
            time, improve interactivity, and enhance the overall user experience
            for both desktop and mobile visitors.
          </p>

          <div className="mt-6">
            {suggestions?.length > 0 ? (
              <ul className="space-y-4">
                {suggestions.map((item, index) => {
                  const status = getOpportunityStatus(item.score);

                  return (
                    <li
                      key={index}
                      className="opportunities_li bg-gray-50 p-4 rounded shadow-sm break-words hover:shadow-md transition-all border-l-4"
                    >
                      {/* Title with color */}
                      <p
                        className={clsx(
                          "font-semibold italic",
                          getStatusColor(status, "text")
                        )}
                      >
                        {`${item.title} (${item.displayValue})`}
                      </p>
                      {/* Description */}
                      <p className="text-xs text-gray-700 mt-1">
                        {item.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-green-600 bg-green-50 border border-green-200 rounded px-4 py-3">
                No major performance suggestions — your page is doing great!
              </p>
            )}
          </div>
        </section>
        {/* <hr className="text-gray-200 my-5" /> */}

        {/* SEO, Accessibility & Best Practices */}
        <section className="p-2 mt-8 md:p-5" aria-labelledby="qa-title">
          <div className="mb-5">
            <h4 id="qa-title" className="font-bold my-4">
              Quality Assurance Scores
            </h4>
            <p className="text-sm">
              These scores reflect accessibility, best practices and search
              engine optimization. While they don't directly impact your
              performance score, they contribute to a more robust,
              user-friendly, and trustworthy website experience.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:px-4 gap-3 px-4">
            <div
              className="md:p-4 md:border-r border-gray-200 transition-transform duration-200 hover:scale-[1.02]"
              role="progressbar"
              aria-valuenow={accessibilityScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ScoreProgress accessibilityScore={accessibilityScore} />
            </div>
            <div
              className="md:p-4 md:border-r border-gray-200 transition-transform duration-200 hover:scale-[1.02]"
              role="progressbar"
              aria-valuenow={bestPracticesScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ScoreProgress bestPracticesScore={bestPracticesScore} />
            </div>
            <div
              className="md:p-4 transition-transform duration-200 hover:scale-[1.02]"
              role="progressbar"
              aria-valuenow={seoScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ScoreProgress seoScore={seoScore} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResultsPage;
