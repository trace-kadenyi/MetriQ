import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import errorGif from "../assets/error.gif";
import {
  MetricsBlock,
  scoreColour,
  borderColour,
} from "../Components/ResultsBlock";
import ScoreProgress from "../Components/ScoreProgress";
import preloader from "../assets/preloader_gif.gif";

const PreviousReports = () => {
  const [prevReports, setPrevReports] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const navigate = useNavigate();

  // fetch previous reports
  useEffect(() => {
    const fetchPrevReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
        );
        if (res.data.success) {
          const sortedReports = res.data.report.reports.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPrevReports(sortedReports);
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

  const ReportSection = ({ label, icon, scores, metrics }) => (
    <div className="p-4 bg-white rounded-xl shadow-inner">
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
    <main className="p-6">
      {errorOccurred ? (
        <section className="p-6 h-screen bg-gray-100 flex justify-center items-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <img
              src={errorGif}
              alt="No data found"
              className="w-32 h-32 mx-auto"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No reports found for this URL
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              We couldn’t find any past reports for:
              <span className="block mt-1 text-gray-500 italic break-words">
                {url}
              </span>
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Back to Home
            </button>
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Previous Reports
          </h2>
          <div className="mt-6 space-y-6">
            {memoizedData.map((report, index) => (
              <div
                key={index}
                className="w-full bg-white shadow-sm hover:shadow-md rounded-2xl border border-gray-100 transition-all"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-50 to-gray-100 border-b border-gray-200 rounded-t-2xl flex flex-col sm:justify-between sm:items-center sm:flex-row gap-2 focus:outline-none cursor-pointer"
                >
                  <p className="text-sm font-semibold text-blue-950 tracking-wide">
                    🕒 Generated on
                  </p>
                  <p className="text-sm font-semibold text-gray-800 italic">
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
                      {/* Content wrapper: keep border radius + padding here */}
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
      )}
    </main>
  );
};

export default PreviousReports;
