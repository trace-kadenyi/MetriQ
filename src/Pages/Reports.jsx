import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

import AISummaryButton, {
  ChartBtn,
  PdfDownloadBtn,
} from "../Components/Buttons/ReportButtons";
import errorGif from "../assets/error.gif";
import {
  scoreColour,
  ErrorTemp,
  Loader,
} from "../Components/ResultsBlocks/CurrResultsBlock";
import preloader from "../assets/preloader_gif.gif";
import { ReportSection } from "../Components/ResultsBlocks/PrevResultsBlock";
import MarkdownRenderer from "../Components/Accessories/MarkdownRenderer";
import Accordion from "../Components/Accessories/Accordion";
import { useFetchReports } from "../hooks/fetchPrevReports";
import { formatReports } from "../utils/formatReports";
import { useAISummary } from "../hooks/useAiSummary";

const Reports = () => {
  const [prevReports, setPrevReports] = useState([]);
  const [unsortedAiReports, setUnsortedAiReports] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const navigate = useNavigate();

  // use aisummary hook
  const {
    aiSummary,
    setAiSummary,
    generatingSummary,
    showSummary,
    handleAISummary,
  } = useAISummary();

  // use fetch reports hook
  const fetchReports = useFetchReports({
    url,
    setLoading,
    setAiSummary,
    setPrevReports,
    setUnsortedAiReports,
    setErrorOccurred,
  });

  useEffect(() => {
    if (url) fetchReports();
  }, [url]);

  // memoize data/formatted reports
  const memoizedData = useMemo(() => formatReports(prevReports), [prevReports]);

  // loading
  if (loading) return <Loader src={preloader} />;

  return (
    <main
      className="min-h-screen bg-gray-50 relative pt-[252px] sm:pt-[112px] dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-950 pb-4"
      role="main"
    >
      {/* error message */}
      {errorOccurred ? (
        <ErrorTemp url={url} errorGif={errorGif} />
      ) : (
        // main content
        <div className="m-2 sm:m-10 p-5 sm:p-10 bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-800 dark:to-blue-950 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          {/* header sect */}
          <section>
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 underline max-w-[80vw] my-4 break-words">
              Showing reports for: {url}
            </h2>
            <p className="w-full md:w-2/3 text-sm text-gray-700 dark:text-gray-200 py-3 rounded-lg mb-6 leading-relaxed">
              Below are the{" "}
              <span className="font-semibold text-blue-500">
                latest performance reports
              </span>{" "}
              for{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-orange-500"
              >
                {url}
              </a>
              . We automatically store up to{" "}
              <span className="font-semibold text-blue-500">
                five of your most recent scans
              </span>{" "}
              for quick reference and comparison.
            </p>
          </section>
          {/* Generate AI Summary */}
          <div className="mt-6 space-y-6">
            <div className="reports_btns flex flex-col-reverse sm:flex-row flex-wrap justify-center items-stretch gap-4 sm:gap-6 lg:gap-8 w-full">
              {/* ai button */}
              <section className="w-full sm:w-auto">
                <AISummaryButton
                  onClick={() => handleAISummary(unsortedAiReports)}
                  disabled={generatingSummary}
                  aiSummary={aiSummary}
                  showSummary={showSummary}
                  generatingSummary={generatingSummary}
                />
              </section>
              {/* charts */}
              <section className="w-full sm:w-auto">
                <ChartBtn url={url} navigate={navigate} />
              </section>
              {/* pdf download */}
              <section className="w-full sm:w-auto">
                {memoizedData.length > 0 && (
                  <div className="">
                    <PdfDownloadBtn
                      url={url}
                      reports={memoizedData}
                      aiSummary={aiSummary}
                    />
                  </div>
                )}
              </section>
            </div>
            {/* ai summary output */}
            <section>
              {aiSummary && showSummary && (
                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-l-4 border-orange-400 rounded-xl shadow space-y-4">
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="prose prose-sm sm:prose lg:prose-lg prose-orange prose-li:marker:text-orange-400 text-gray-800 dark:text-gray-200 max-w-none"
                  >
                    <MarkdownRenderer content={aiSummary} />
                  </motion.article>
                </div>
              )}
            </section>
            <section>
              {/* previous reports */}
              <Accordion
                items={memoizedData}
                renderTitle={(report, index, isOpen) => (
                  <>
                    <p className="text-sm font-semibold text-blue-950 tracking-wide dark:text-gray-100">
                      🕒 Generated on
                    </p>
                    <p
                      className={clsx(
                        "text-sm italic font-medium",
                        isOpen
                          ? scoreColour(report.scores.mobile.performance || 0)
                          : "text-gray-800 dark:text-gray-100"
                      )}
                    >
                      {report.createdAt}
                    </p>
                    <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">
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
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export default Reports;
