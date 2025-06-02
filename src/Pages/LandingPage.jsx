import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CampaigncircleBg from "../assets/CampaignBtn.avif";
import WebCircleBg from "../assets/endevioBtn.webp";

const LandingPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          "https://web-vitals-hq-backend.vercel.app/api/report"
        );
        const data = await response.json();

        if (data.reports) {
          setReports(data.reports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <main>
      <h1 className="landingTitle">Site Core Web Vitals / Metrics</h1>
      {/* <section className="landingPage">
        <div className="button-container">
          <Link
            to={`/chinese-en-campaign/${
              reports.find((report) =>
                report.url.includes("chinese-investment-migration")
              )?._id
            }`}
            className="image-button ch_campaign"
          >
            <img src={CampaigncircleBg} alt="Chinese Campaign Button" />
            <span className="button-text">Chinese Campaign (EN)</span>
          </Link>
        </div>
        <div className="button-container">
          <Link
            to={`/chinese-zh-campaign/${
              reports.find((report) =>
                report.url.includes("%E9%A9%AC%E8%80%B3%E4%BB%96")
              )?._id
            }`}
            className="image-button ch_campaign"
          >
            <img src={CampaigncircleBg} alt="Chinese Campaign Button" />
            <span className="button-text">Chinese Campaign (Zh-CN)</span>
          </Link>
        </div>

        <div className="button-container">
          <Link
            to={`/endevio/${
              reports.find((report) => {
                const isEndevio = report.url === "https://endevio.com";
                return isEndevio;
              })?._id
            }`}
            className="image-button endevio_web"
          >
            <img src={WebCircleBg} alt="ENDEVIO Button" />
            <span className="button-text">Endevio</span>
          </Link>
        </div>

        <div className="button-container">
          <Link
            to={`/quivani/${
              reports.find((report) => report.url.includes("quivani"))?._id
            }`}
            className="image-button quivani_web"
          >
            <img src={WebCircleBg} alt="Quivani Button" />
            <span className="button-text">Quivani</span>
          </Link>
        </div>

        <div className="button-container">
          <Link
            to={`/usCampaign/${
              reports.find((report) => report.url.includes("malta_cbi_usa"))
                ?._id
            }`}
            className="image-button us_campaign"
          >
            <img src={CampaigncircleBg} alt="US Campaign Button" />
            <span className="button-text">US Campaign</span>
          </Link>
        </div>

        <div className="button-container">
          <Link
            to={`/ukCampaign/${
              reports.find((report) => report.url.includes("uk-non-doms"))?._id
            }`}
            className="image-button uk_campaign"
          >
            <img src={CampaigncircleBg} alt="UK Campaign Button" />
            <span className="button-text">UK Campaign</span>
          </Link>
        </div>
      </section> */}
    </main>
  );
};

export default LandingPage;
