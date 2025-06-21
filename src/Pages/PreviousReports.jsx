import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import errorGif from "../assets/error.gif";
import { scoreColour, ErrorTemp } from "../Components/ResultsBlock";
import preloader from "../assets/preloader_gif.gif";
import {
  generateSummaryInput,
  ReportSection,
} from "../Components/PrevResultsBlock";
import MarkdownRenderer from "../Components/MarkdownRenderer";
import AISummaryButton from "../Components/AiSummaryButton";

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
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="prose prose-sm sm:prose lg:prose-lg prose-orange prose-li:marker:text-orange-400 text-gray-800 max-w-none"
                  >
                    <MarkdownRenderer content={aiSummary} />
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
