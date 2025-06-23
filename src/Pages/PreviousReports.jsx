import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

import errorGif from "../assets/error.gif";
import { scoreColour, ErrorTemp, Loader } from "../Components/ResultsBlock";
import preloader from "../assets/preloader_gif.gif";
import {
  generateSummaryInput,
  ReportSection,
} from "../Components/PrevResultsBlock";
import MarkdownRenderer from "../Components/MarkdownRenderer";
import AISummaryButton from "../Components/AiSummaryButton";
import Accordion from "../Components/Accordion";
import { useFetchReports } from "../hooks/fetchPrevReports";
import { formatReports } from "../../utils/formatReports";
import MetricChartWithToggles, {
  safeDate,
  parseMetric,
} from "../Components/MetricChartWithToggles";
import { chartReportsData } from "../../utils/chartReportsData";

const PreviousReports = () => {
  const [prevReports, setPrevReports] = useState([]);
  const [unsortedAiReports, setUnsortedAiReports] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  // fetch previous reports
  const fetchReports = useFetchReports(
    url,
    setLoading,
    setAiSummary,
    setPrevReports,
    setUnsortedAiReports,
    setErrorOccurred
  );
  useEffect(() => {
    if (url) fetchReports();
  }, [url]);

  // memoize data/formatted reports
  const memoizedData = useMemo(() => formatReports(prevReports), [prevReports]);

  // AI summary trigger
  const handleAISummary = async () => {
    if (aiSummary) {
      setShowSummary((prev) => !prev);
      return;
    }

    setGeneratingSummary(true);
    try {
      const inputText = generateSummaryInput(unsortedAiReports);

      const res = await axios.post("http://localhost:4000/api/summarize", {
        inputText,
      });

      setAiSummary(res.data.summary);
      setShowSummary(true);
    } catch (err) {
      console.error("AI summarization failed:", err);
      toast.error("Failed to generate AI summary");
    } finally {
      setGeneratingSummary(false);
    }
  };

  // Chart data
  const chartData = useMemo(
    () => chartReportsData(memoizedData, safeDate, parseMetric),
    [memoizedData]
  );

  // loading
  if (loading) return <Loader src={preloader} />;

  return (
    <main className="min-h-screen bg-gray-50 relative" role="main">
      {/* error message */}
      {errorOccurred ? (
        <ErrorTemp url={url} errorGif={errorGif} />
      ) : (
        // main content
        <div className="m-2 sm:m-10 p-5 sm:p-10 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <section>
            <h2 className="font-semibold text-lg text-gray-800 underline max-w-[80vw] my-4 break-words">
              Showing reports for:{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={url}
                aria-label={`Open ${url} in a new tab`}
                className="hover:text-orange-400"
              >
                {url}
              </a>
            </h2>
            <p className="text-sm text-gray-700 py-3 rounded-lg mb-6 leading-relaxed">
              These are the{" "}
              <span className="font-semibold text-blue-500">
                most recent performance reports
              </span>{" "}
              for{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500 hover:text-orange-500"
              >
                {url}
              </a>
              .<br className="hidden sm:block" />
              Up to{" "}
              <span className="font-semibold text-blue-500">5 reports</span> are
              saved per site. Click any card below to view full details.
            </p>

            <div className="mt-6 space-y-6">
              {/* Generate AI Summary */}
              <AISummaryButton
                onClick={handleAISummary}
                disabled={generatingSummary}
                aiSummary={aiSummary}
                showSummary={showSummary}
                generatingSummary={generatingSummary}
              />
              {aiSummary && showSummary && (
                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-gray-100 border-l-4 border-orange-400 rounded-xl shadow space-y-4">
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="prose prose-sm sm:prose lg:prose-lg prose-orange prose-li:marker:text-orange-400 text-gray-800 max-w-none"
                  >
                    <MarkdownRenderer content={aiSummary} />
                  </motion.article>
                </div>
              )}

              {/* previous reports */}
              <Accordion
                items={memoizedData}
                renderTitle={(report, index, isOpen) => (
                  <>
                    <p className="text-sm font-semibold text-blue-950 tracking-wide">
                      🕒 Generated on
                    </p>
                    <p
                      className={clsx(
                        "text-sm italic font-medium",
                        isOpen
                          ? scoreColour(report.scores.mobile.performance || 0)
                          : "text-gray-800"
                      )}
                    >
                      {report.createdAt}
                    </p>
                    <span className="ml-2 text-lg text-gray-600">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </>
                )}
                renderContent={(report) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReportSection
                      label="Mobile"
                      icon="📱"
                      scores={report.scores.mobile}
                      metrics={report.metrics.mobile}
                    />
                    <ReportSection
                      label="Desktop"
                      icon="🖥️"
                      scores={report.scores.desktop}
                      metrics={report.metrics.desktop}
                    />
                  </div>
                )}
              />
            </div>
          </section>
          <section>
            {/* Performance Chart */}
            <MetricChartWithToggles
              title="Scores: Performance, Accessibility, Best Practices, SEO"
              data={chartData}
              lines={[
                {
                  key: "mobilePerformance",
                  label: "Performance",
                  device: "mobile",
                },
                {
                  key: "desktopPerformance",
                  label: "Performance",
                  device: "desktop",
                },
                { key: "mobileSEO", label: "SEO", device: "mobile" },
                { key: "desktopSEO", label: "SEO", device: "desktop" },
                { key: "mobileBP", label: "Best Practices", device: "mobile" },
                {
                  key: "desktopBP",
                  label: "Best Practices",
                  device: "desktop",
                },
                {
                  key: "mobileAccessibility",
                  label: "Accessibility",
                  device: "mobile",
                },
                {
                  key: "desktopAccessibility",
                  label: "Accessibility",
                  device: "desktop",
                },
              ]}
            />
            {/* Core Web Vitals Chart */}
            <MetricChartWithToggles
              title="Core Web Vitals: Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)"
              data={chartData}
              lines={[
                { key: "mobileLCP", label: "LCP", device: "mobile" },
                { key: "desktopLCP", label: "LCP", device: "desktop" },
                { key: "mobileFID", label: "FID", device: "mobile" },
                { key: "desktopFID", label: "FID", device: "desktop" },
                { key: "mobileCLS", label: "CLS", device: "mobile" },
                { key: "desktopCLS", label: "CLS", device: "desktop" },
              ]}
            />
          </section>
        </div>
      )}
    </main>
  );
};

export default PreviousReports;
