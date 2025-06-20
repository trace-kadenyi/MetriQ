import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import errorGif from "../assets/error.gif";
import {
  MetricsBlock,
  scoreColour,
  borderColour,
  ErrorTemp,
} from "../Components/ResultsBlock";
import ScoreProgress from "../Components/ScoreProgress";
import preloader from "../assets/preloader_gif.gif";

const PreviousReports = () => {
  const [prevReports, setPrevReports] = useState([]);
  const [unsortedAiReports, setUnsortedAiReports] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const navigate = useNavigate();

  // fetch previous reports
  useEffect(() => {
    const fetchPrevReports = async () => {
      setLoading(true);
      setAiSummary("");
      try {
        const res = await axios.get(
          `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
        );
        if (res.data.success) {
          const sortedReports = res.data.report.reports.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPrevReports(sortedReports);
          setUnsortedAiReports(res.data.report.reports);
        } else {
          toast.error(`No reports found for ${url}`);
          setErrorOccurred(true);
        }
      } catch (err) {
        console.error("Error fetching reports: ", err);
        setErrorOccurred(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchPrevReports();
  }, [url]);

  // memoize data
  const memoizedData = useMemo(() => {
    return Array.isArray(prevReports)
      ? prevReports.map((report) => {
          const formattedDate = `${new Date(
            report.createdAt
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} at ${new Date(report.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`;

          return {
            createdAt: formattedDate,
            scores: report.scores,
            metrics: report.metrics,
          };
        })
      : [];
  }, [prevReports]);

  // generate summary input text

  const generateSummaryInput = () => {
    return [...unsortedAiReports] // clone to avoid mutating state
      .reverse() // most recent first
      .map((report, index) => {
        const m = report.metrics.mobile;
        const d = report.metrics.desktop;
        const formattedDate = new Date(report.createdAt).toLocaleDateString(
          "en-US",
          { day: "numeric", month: "long", year: "numeric" }
        );

        return `Report ${index + 1} (${formattedDate})

Mobile Scores:
- Performance: ${report.scores.mobile.performance}
- SEO: ${report.scores.mobile.seo}
- Best Practices: ${report.scores.mobile.bestPractices}
- Accessibility: ${report.scores.mobile.accessibility}

Mobile Metrics:
- Largest Contentful Paint: ${m["Largest Contentful Paint"]?.value || "N/A"}
- First Contentful Paint: ${m["First Contentful Paint"]?.value || "N/A"}
- First Input Delay: ${m["First Input Delay"]?.value || "N/A"}
- Cumulative Layout Shift: ${m["Cumulative Layout Shift"]?.value || "N/A"}
- Speed Index: ${m["Speed Index"]?.value || "N/A"}
- Total Blocking Time: ${m["Total Blocking Time"]?.value || "N/A"}

Desktop Scores:
- Performance: ${report.scores.desktop.performance}
- SEO: ${report.scores.desktop.seo}
- Best Practices: ${report.scores.desktop.bestPractices}
- Accessibility: ${report.scores.desktop.accessibility}

Desktop Metrics:
- Largest Contentful Paint: ${d["Largest Contentful Paint"]?.value || "N/A"}
- First Contentful Paint: ${d["First Contentful Paint"]?.value || "N/A"}
- First Input Delay: ${d["First Input Delay"]?.value || "N/A"}
- Cumulative Layout Shift: ${d["Cumulative Layout Shift"]?.value || "N/A"}
- Speed Index: ${d["Speed Index"]?.value || "N/A"}
- Total Blocking Time: ${d["Total Blocking Time"]?.value || "N/A"}`;
      })
      .join("\n\n");
  };

  // AI summary trigger
  const handleAISummary = async () => {
    if (aiSummary) {
      setShowSummary((prev) => !prev);
      return;
    }

    setGeneratingSummary(true);
    try {
      const inputText = generateSummaryInput();

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

  // toggle accordion
  const toggleAccordion = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  // loading
  if (loading)
    return (
      <div className="preloader_div flex justify-center items-center h-screen bg-gray-50">
        <img src={preloader} alt="preloader" className="" />
      </div>
    );

  // Report section template
  const ReportSection = ({ label, icon, scores, metrics }) => (
    <div className="p-2 sm:p-4 bg-white rounded-xl shadow-inner">
      <h4
        className={`font-semibold text-lg mb-1 ${scoreColour(
          scores.performance
        )}`}
      >
        {icon} {label}
      </h4>
      <hr className={`mb-4 border-t-2 ${borderColour(scores.performance)}`} />{" "}
      <div className="flex gap-3 md:gap-5 flex-wrap justify-center  border-red-500 px-3">
        <div className="flex">
          <ScoreProgress
            performanceScore={scores.performance}
            progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
            wrapperAlign="items-center"
          />
        </div>
        <ScoreProgress
          seoScore={scores.seo}
          showDescriptions={false}
          progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
          wrapperAlign="items-center"
        />
        <ScoreProgress
          bestPracticesScore={scores.bestPractices}
          showDescriptions={false}
          progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
          wrapperAlign="items-center"
        />
        <ScoreProgress
          accessibilityScore={scores.accessibility}
          showDescriptions={false}
          progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
          wrapperAlign="items-center"
        />
      </div>
      <div className="bg-white mt-2 px-6 py-2 rounded-xl shadow-sm">
        <MetricsBlock title="METRICS" metrics={metrics} />
      </div>
    </div>
  );

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
                className="hover:text-orange-400 hover:italic"
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
              <button
                onClick={handleAISummary}
                disabled={generatingSummary}
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded shadow hover:opacity-90 disabled:opacity-60 cursor-pointer flex items-center gap-2"
              >
                {generatingSummary ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : aiSummary && showSummary ? (
                  "🙈 Hide AI Analysis"
                ) : (
                  "🧠 Generate AI Analysis"
                )}
              </button>
              {aiSummary && showSummary && (
                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-gray-100 border-l-4 border-orange-400 rounded-xl shadow space-y-4">
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="prose prose-sm sm:prose lg:prose-lg prose-orange prose-li:marker:text-orange-400 text-gray-800 max-w-none"
                  >
                    <ReactMarkdown
                      components={{
                        h2({ children }) {
                          return (
                            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-5 underline underline-offset-4">
                              {children}
                            </h2>
                          );
                        },
                        h3({ children }) {
                          return (
                            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 underline underline-offset-4">
                              {children}
                            </h3>
                          );
                        },
                        h4({ children }) {
                          return (
                            <h3 className="font-semibold text-gray-800 mt-8 mb-4">
                              {children}
                            </h3>
                          );
                        },
                        p({ children }) {
                          return (
                            <p className="my-4 text-black leading-relaxed">
                              {children}
                            </p>
                          );
                        },
                        ul({ children }) {
                          return (
                            <ul className="my-4 list-disc pl-6 text-black">
                              {children}
                            </ul>
                          );
                        },
                        ol({ children }) {
                          return (
                            <ol className="my-4 list-decimal pl-6 text-black">
                              {children}
                            </ol>
                          );
                        },
                        li({ children }) {
                          return <li className="mb-2">{children}</li>;
                        },
                        strong({ children }) {
                          return (
                            <strong className="font-semibold text-gray-800">
                              {children}
                            </strong>
                          );
                        },
                        em({ children }) {
                          return (
                            <em className="font-semibold text-gray-800 italic">
                              {children}
                            </em>
                          );
                        },
                        code({ inline, children }) {
                          return inline ? (
                            <code className="bg-gray-100 rounded px-1 text-red-500 text-sm">
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm my-6">
                              <code>{children}</code>
                            </pre>
                          );
                        },
                      }}
                    >
                      {aiSummary}
                    </ReactMarkdown>
                  </motion.article>
                </div>
              )}

              {/* previous reports */}
              {memoizedData.map((report, index) => (
                <div
                  key={index}
                  className={clsx("w-full rounded-2xl border transition-all", {
                    "bg-white shadow-md border-green-100": openIndex === index,
                    "bg-white shadow-sm hover:shadow-md border-gray-100":
                      openIndex !== index,
                  })}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={clsx(
                      "w-full px-6 py-3 border-b rounded-t-2xl flex flex-col sm:justify-between sm:items-center sm:flex-row gap-2 focus:outline-none cursor-pointer transition-all duration-200 transform hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg",
                      openIndex === index
                        ? "bg-gradient-to-r from-green-50 via-orange-50 to-blue-100 border-green-300 shadow-md text-blue-950 font-semibold"
                        : "bg-gradient-to-r from-blue-50 to-gray-100 border-gray-200 text-gray-800"
                    )}
                  >
                    <p className="text-sm font-semibold text-blue-950 tracking-wide">
                      🕒 Generated on
                    </p>
                    <p
                      className={clsx(
                        "text-sm italic font-medium",
                        openIndex === index
                          ? scoreColour(report.scores.mobile.performance || 0)
                          : "text-gray-800"
                      )}
                    >
                      {report.createdAt}
                    </p>

                    <span className="ml-2 text-lg text-gray-600">
                      {openIndex === index ? "▲" : "▼"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        layout
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 70,
                          damping: 18,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-4 rounded-b-2xl bg-white">
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default PreviousReports;
