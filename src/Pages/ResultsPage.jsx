import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ScoreBlock,
  MetricsBlock,
  getStatusColor,
} from "../Components/ResultsBlock";
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
          <h2 className="md:text-2xl font-bold text-gray-800 underline">
            <a
              href={report.url}
              target="_blank"
              className="hover:text-blue-500"
            >
              {report.url}
            </a>
          </h2>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 cursor-pointer rounded-md font-medium ${
                view === "mobile"
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gray-200 text-gray-700 transition-shadow hover:shadow-md"
              }`}
              onClick={() => setView("mobile")}
            >
              Mobile
            </button>
            <button
              className={`px-4 py-2 cursor-pointer rounded-md font-medium ${
                view === "desktop"
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gray-200 text-gray-700 transition-shadow hover:shadow-md"
              }`}
              onClick={() => setView("desktop")}
            >
              Desktop
            </button>
          </div>
        </section>

        {/* Score progress and core web vitals */}
        <section className="mt-10 gap-3 flex md:items-center justify-between lg:px-20 flex-col md:flex-row">
          <ScoreProgress performanceScore={performanceScore} />
          <div>
            <h4 className="underline my-2 text-sm">Core Web Vitals</h4>
            <div className="flex gap-3 flex-col md:flex-row">
              {/* LCP */}
              <p className="text-sm flex gap-1 md:items-center flex-row md:flex-col md:border-r md:border-gray-200 pr-3">
                <span className="flex gap-1 items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full ml-1"
                    style={getStatusColor(
                      report.metrics[view]["Largest Contentful Paint"].status,
                      "style"
                    )}
                  />
                  <span className="after:content-[':_'] md:after:content-none">
                    LCP
                  </span>
                </span>
                <span>
                  {report.metrics[view]["Largest Contentful Paint"].value}
                </span>
              </p>
              {/* FID */}
              <p className="text-sm flex gap-1 md:items-center md:flex-col md:border-r md:border-gray-200 pr-3">
                <span className="flex gap-1 items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full ml-1"
                    style={getStatusColor(
                      report.metrics[view]["First Input Delay"].status,
                      "style"
                    )}
                  />
                  <span className="after:content-[':_'] md:after:content-none">
                    First Input Delay
                  </span>
                </span>
                <span>{report.metrics[view]["First Input Delay"].value}</span>
              </p>
              {/* CLS */}
              <p className="text-sm flex gap-1 md:items-center md:flex-col">
                <span className="flex gap-1 items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full ml-1"
                    style={getStatusColor(
                      report.metrics[view]["Cumulative Layout Shift"].status,
                      "style"
                    )}
                  />
                  <span className="after:content-[':_'] md:after:content-none">
                    Cumulative Layout Shift
                  </span>
                </span>
                <span>
                  {report.metrics[view]["Cumulative Layout Shift"].value}
                </span>
              </p>
            </div>
          </div>
        </section>
        <hr className="text-gray-200 my-5" />
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
