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
      <section className="landingPage">
        <div className="button-container">
          <Link
            to={`/siteurl/${
              reports.find((report) => {
                const isEndevio = report.url === "https://endevio.com";
                return isEndevio;
              })?._id
            }`}
            className="image-button endevio_web"
          >
            <img src={WebCircleBg} alt="Site Button" />
            <span className="button-text">Site URL</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
