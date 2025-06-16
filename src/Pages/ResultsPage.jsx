import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScoreBlock, MetricsBlock, getStatusTextColor } from "../Components/ResultsBlock";
import ScoreProgress from "../Components/ScoreProgress";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [report, setReport] = useState(null);
  const [view, setView] = useState("mobile");

  useEffect(() => {
    // fetch report from API
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
        );
        if (res.data.success) {
          setReport(res.data.report);
        } else {
          alert("No report found for this URL.");
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        alert("Could not load the report.");
      }
    };

    if (url) fetchReport();
  }, [url]);

  if (!report) return <p>Loading...</p>;

  const {
    scores: { mobile, desktop },
    metrics: { mobile: mobileMetrics, desktop: desktopMetrics },
  } = report;

  const deviceData = view === "mobile" ? mobileMetrics : desktopMetrics;
  const performanceScore =
    view === "mobile" ? mobile.performance : desktop.performance;
  const seoScore = view === "mobile" ? mobile.seo : desktop.seo;
  const accessibilityScore =
    view === "mobile" ? mobile.accessibility : desktop.accessibility;

 

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="m-10 p-10 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <section className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Report for {report.url}
          </h2>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md font-medium ${
                view === "mobile"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView("mobile")}
            >
              Mobile
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium ${
                view === "desktop"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView("desktop")}
            >
              Desktop
            </button>
          </div>
        </section>

        {/* Score progress and core web vitals */}
        <section className="mt-10">
          <ScoreProgress performanceScore={performanceScore} />
          <div>
            <h4>Core Web Vitals</h4>
            <p className="text-sm flex gap-1 items-center">
              <span
                className="inline-block w-3 h-3 rounded-full ml-1"
                style={getStatusTextColor(report.metrics[view].LCP.status)}
              />
              LCP {report.metrics[view].LCP.value}
            </p>
            <p className="text-sm flex gap-1 items-center">
              <span
                className="inline-block w-3 h-3 rounded-full ml-1"
                style={getStatusTextColor(report.metrics[view].FID.status)}
              />
              FID {report.metrics[view].FID.value}
            </p>
            <p className="text-sm flex gap-1 items-center">
              <span
                className="inline-block w-3 h-3 rounded-full ml-1"
                style={getStatusTextColor(report.metrics[view].CLS.status)}
              />
              CLS {report.metrics[view].CLS.value}
            </p>
          </div>
        </section>
        {/* Metrics block */}
        <section>
          <MetricsBlock
            title={`${view === "mobile" ? "Mobile" : "Desktop"} Metrics`}
            metrics={report.metrics[view]}
          />
        </section>
      </div>
    </main>
  );
};

export default ResultsPage;
