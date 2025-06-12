import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScoreBlock, MetricsBlock } from "../Components/ResultsBlock";
import ScoreProgress from "../Components/ScoreProgress";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [report, setReport] = useState(null);
  const [view, setView] = useState("mobile");

  useEffect(() => {
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

  // Get text color based on status
  const getStatusTextColor = (status) => {
    switch (status) {
      case "Good":
        return { color: "#28a745" }; // Green for Good
      case "Needs Improvement":
        return { color: "#ffc107" }; // Yellow for Needs Improvement
      case "Poor":
        return { color: "#dc3545" }; // Red for Poor
      default:
        return { color: "#6c757d" }; // Neutral color for default
    }
  };

  // let performanceScore = report.scores.performance;

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

        {/* Score progress */}
        <section className="mt-10">
          <ScoreProgress
            performanceScore={performanceScore}
            seoScore={seoScore}
            accessibilityScore={accessibilityScore}
          />
        </section>
      </div>
    </main>

    // <main>
    //   <div className="m-10 p-10 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
    //     <section className="flex justify-between">
    //       <h2 className="text 2xl font-bold mb-4">Report for {report.url}</h2>
    //       <div className="mb-6">
    //         <button
    //           className={`px-4 py-2 mr-2 rounded ${
    //             view === "mobile" ? "bg-blue-600 text-white" : "bg-gray-200"
    //           }`}
    //           onClick={() => setView("mobile")}
    //         >
    //           Mobile
    //         </button>
    //         <button
    //           className={`px-4 py-2 rounded ${
    //             view === "desktop" ? "bg-blue-600 text-white" : "bg-gray-200"
    //           }`}
    //           onClick={() => setView("desktop")}
    //         >
    //           Desktop
    //         </button>
    //       </div>
    //     </section>
    //     <section>
    //       <ScoreProgress
    //         performanceScore={performanceScore}
    //         seoScore={seoScore}
    //         accessibilityScore={accessibilityScore}
    //       />
    //       <div className="metrics-container">
    //     {Object.entries(deviceData).map(([key, metric]) => {
    //       const statusTextColor = getStatusTextColor(metric.status);

    //       return (
    //         <div key={key} className="metric-box">
    //           <h3 className="metric-label">{key}</h3>
    //           <p className="metric-value">{metric.value}</p>
    //           <p className="metric-status" style={statusTextColor}>
    //             {metric.status}
    //           </p>
    //         </div>
    //       );
    //     })}
    //   </div>
    //     </section>
    //     <section>
    //       <div>
    //           <ScoreProgress />
    //       </div>
    //     </section>
    //     <section>
    //       <ScoreBlock
    //         title={`${view === "mobile" ? "Mobile" : "Desktop"} Scores`}
    //         scores={report.scores[view]}
    //       />
    //       <MetricsBlock
    //         title={`${view === "mobile" ? "Mobile" : "Desktop"} Metrics`}
    //         metrics={report.metrics[view]}
    //       />
    //     </section>
    //   </div>
    //   <div></div>
    // </main>
  );
};

export default ResultsPage;
