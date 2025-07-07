import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";

import CompetitorComparisonPDF from "../PDFBlocks/CompetitorComparisonPDF";

// handle buttons
const CompetitorBtns = ({
  competitors,
  loading,
  addCompetitor,
  handleCompare,
}) => {
  return (
    <div className="flex gap-3">
      {competitors.length < 3 && !loading && (
        <button
          type="button"
          onClick={addCompetitor}
          disabled={loading}
          className="w-full sm:w-auto 1inline-block rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Competitor
        </button>
      )}

      <button
        type="button"
        onClick={handleCompare}
        disabled={loading}
        className={`${
          !loading
            ? "w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold text-white dark:text-gray-100 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-gray-400 dark:hover:text-blue-700 flex items-center justify-center gap-2 cursor-pointer"
            : "hidden"
        }`}
      >
        Compare
      </button>
    </div>
  );
};

export default CompetitorBtns;

// Competitor chart button
export const CompetitorChartBtn = ({ url, navigate, comparison }) => (
  <motion.button
    onClick={() =>
      navigate(`/competitors/charts?url=${encodeURIComponent(url)}`, {
        state: { comparison },
      })
    }
    whileHover={{
      boxShadow: [
        "0 0 0px #fb923c",
        "0 0 8px #fb923c",
        "0 0 12px #fb923c",
        "0 0 20px #fb923c",
        "0 0 0px #fb923c",
      ],
      scale: [1, 1.15, 1],
      transition: { duration: 0.8, ease: "easeInOut" },
    }}
    className="mx-auto w- sm:min-w-[14rem] bg-gradient-to-r from-green-600 to-orange-400 text-white px-4 py-2 rounded shadow hover:opacity-90 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center"
  >
    <>
      <BarChart3 className="w-5 h-5" />
      Chart Comparison Results
    </>
  </motion.button>
);

// competitor comparison pdf
export const ComparisonPdfBtn = ({ comparison, aiAnalysis }) => (
  <div className="w-3/4 mx-auto sm:w-auto">
    <PDFDownloadLink
      document={
        <CompetitorComparisonPDF
          comparison={comparison}
          aiAnalysis={aiAnalysis}
        />
      }
      fileName="competitor_comparison.pdf"
      className="inline-flex bg-gradient-to-r from-green-600 to-orange-600 dark:from-green-800 dark:to-orange-800
                 text-white px-4 py-2 rounded shadow hover:opacity-90
                 disabled:opacity-60 items-center gap-2 justify-center w-full"
    >
      <Download className="w-5 h-5" />
      Download PDF
    </PDFDownloadLink>
  </div>
);
