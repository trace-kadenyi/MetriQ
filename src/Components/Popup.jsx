import { motion } from "framer-motion";
import { CheckCircle, ArrowRightCircle } from "lucide-react";
import clsx from "clsx";

import preloaderGif from "../assets/preloader_gif.gif";
import {
  scoreColour,
  borderColour,
  getStatusColor,
  getScoreStatus,
} from "../Components/ResultsBlock";

const Popup = ({
  setShowPopup,
  setLoading,
  partialResults,
  submittedUrl,
  showLongWaitMessage,
  navigate,
}) => {
  const renderScore = (label, score) => {
    const status = getScoreStatus(score);
    const colorClass = getStatusColor(status, "text");
    const ratingText = status.charAt(0).toUpperCase() + status.slice(1); // e.g. "Good", "Average", "Poor"

    return (
      <p className="mb-1 font-semibold">
        {label}:{" "}
        <span className={clsx(colorClass)}>
          {score ?? "N/A"}{" "}
          {score !== undefined && <span className="ml-1">({ratingText})</span>}
        </span>
      </p>
    );
  };
  return (
    <>
      {/* Faded Background */}
      <div className="fixed inset-0 backdrop-blur-sm bg-slate-800/30 z-10"></div>
      {/* Animated Popup */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 shadow-xl border border-gray-200 rounded-2xl p-8 w-[95%] max-w-xl text-center"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setShowPopup(false);
            setLoading(false);
          }}
          className="absolute top-4 right-5 text-gray-400 hover:text-red-600 text-2xl font-bold"
          aria-label="Close popup"
        >
          &times;
        </button>

        {/* Spinner or Results */}
        {!partialResults ? (
          <>
            <div className="my-2 mx-auto flex justify-center">
              <img
                src={preloaderGif}
                alt="Analyzing site"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-base font-medium">
              Generating your PageSpeed Insights report...
            </h3>
            {!showLongWaitMessage && (
              <div>
                <p className="text-sm text-gray-500 mt-1">
                  Hang tight — this may take up to 30 seconds.
                </p>
              </div>
            )}
            {/* Appears when it take more than 20s */}
            {showLongWaitMessage && (
              <div className="mt-3 text-sm max-w-md mx-auto text-center">
                <p className="text-red-600 font-semibold leading-relaxed">
                  Note that this may take longer than usual because the website
                  has a large number of resources or complex scripts that
                  require deeper analysis.
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold text-blue-950 mb-6"
            >
              <CheckCircle className="text-blue-950 w-6 h-6 inline-block mr-2" />
              Report Ready
            </motion.h3>

            <div className="grid grid-cols-2 gap-6 text-sm text-left justify-center">
              {/* Mobile Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4
                  className={`font-semibold text-lg mb-1 ${scoreColour(
                    partialResults.mobile.performance
                  )}`}
                >
                  📱 Mobile
                </h4>
                <hr
                  className={`mb-4 border-t-2 ${borderColour(
                    partialResults.mobile.performance
                  )}`}
                />{" "}
                {renderScore("Performance", partialResults.mobile?.performance)}
                {renderScore("SEO", partialResults.mobile?.seo)}
                {renderScore(
                  "Accessibility",
                  partialResults.mobile?.accessibility
                )}
                {renderScore(
                  "Best Practices",
                  partialResults.mobile?.bestPractices
                )}
              </motion.div>

              {/* Desktop Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4
                  className={`font-semibold text-lg mb-1 ${scoreColour(
                    partialResults.desktop.performance
                  )}`}
                >
                  🖥️ Desktop
                </h4>
                <hr
                  className={`mb-4 border-t-2 ${borderColour(
                    partialResults.desktop.performance
                  )}`}
                />{" "}
                {renderScore(
                  "Performance",
                  partialResults.desktop?.performance
                )}
                {renderScore("SEO", partialResults.desktop?.seo)}
                {renderScore(
                  "Accessibility",
                  partialResults.desktop?.accessibility
                )}
                {renderScore(
                  "Best Practices",
                  partialResults.desktop?.bestPractices
                )}
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-8 px-5 py-2 mx-auto bg-blue-500 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer flex items-center justify-center gap-2"
              onClick={() => {
                setShowPopup(false);
                setLoading(false);

                navigate(`/report?url=${encodeURIComponent(submittedUrl)}`);
              }}
            >
              View Full Report <ArrowRightCircle className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Popup;
