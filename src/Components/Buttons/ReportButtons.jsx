import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "../ResultsBlocks/ReportPDF";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star,
  StarOff,
  Loader2,
  Lightbulb,
  BarChart3,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

import { useFavourites } from "../../context/FavouritesContext";

const AISummaryButton = ({
  onClick,
  disabled,
  aiSummary,
  showSummary,
  generatingSummary,
}) => (
  <motion.button
    whileHover={{
      boxShadow: [
        "0 0 0px #3b82f6",
        "0 0 8px #3b82f6",
        "0 0 12px #3b82f6",
        "0 0 20px #3b82f6",
        "0 0 0px #3b82f6",
      ],
      scale: [1, 1.15, 1],
      transition: { duration: 0.8, ease: "easeInOut" },
    }}
    onClick={onClick}
    disabled={disabled}
    className="mx-auto w-3/4 sm:w-[14rem] md:min-w-[16rem] bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded shadow hover:opacity-90 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Generating...
      </>
    ) : aiSummary && showSummary ? (
      <>
        <EyeOff className="w-5 h-5" />
        Hide AI Analysis
      </>
    ) : aiSummary && !showSummary ? (
      <>
        <Eye className="w-5 h-5" />
        Show AI Analysis
      </>
    ) : (
      <>
        <Lightbulb className="w-5 h-5" />
        Generate AI Analysis
      </>
    )}
  </motion.button>
);

export default AISummaryButton;

// chart button
export const ChartBtn = ({ url, navigate }) => (
  <motion.button
    onClick={() => {
      navigate(`/charts?url=${encodeURIComponent(url)}`);
    }}
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
    className="mx-auto w-3/4 sm:w-[14rem] md:min-w-[16rem] bg-gradient-to-r from-green-600 to-orange-400 text-white px-4 py-2 rounded shadow hover:opacity-90 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center"
  >
    <>
      <BarChart3 className="w-5 h-5" />
      Chart My Reports
    </>
  </motion.button>
);

// pdf download button
export const PdfDownloadBtn = ({ url, reports, aiSummary }) => (
  <motion.div
    whileHover={{
      boxShadow: [
        "0 0 0px #34d399",
        "0 0 8px #34d399",
        "0 0 12px #34d399",
        "0 0 20px #34d399",
        "0 0 0px #34d399",
      ],
      scale: [1, 1.15, 1],
      transition: { duration: 0.8, ease: "easeInOut" },
    }}
    className="w-3/4 sm:w-[14rem] md:min-w-[16rem] mx-auto"
  >
    <PDFDownloadLink
      document={<ReportPDF url={url} reports={reports} aiSummary={aiSummary} />}
      fileName="performance_report.pdf"
      className="inline-flex w-full sm:w-[14rem] md:min-w-[16rem]
                 bg-gradient-to-r from-green-500 to-blue-600 text-white
                 px-4 py-2 rounded shadow hover:opacity-90
                 disabled:opacity-60 cursor-pointer items-center gap-2 justify-center text-center"
    >
      <>
        <Download className="w-5 h-5" />
        Download PDF
      </>
    </PDFDownloadLink>
  </motion.div>
);

export function FavouriteBtn({ url, size = 18 }) {
  const { isFavourite, toggleFavourite, loading } = useFavourites();
  const [optimistic, setOptimistic] = useState(false); // during local toggle

  // Figure out the current status, taking optimistic updates into account
  const saved = optimistic ? !isFavourite(url) : isFavourite(url);

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent <a> parent navigation if any
    if (loading) return; // Still fetching initial data

    setOptimistic(true); // Immediate UI feedback
    try {
      await toggleFavourite(url); // Update server + context
    } finally {
      setOptimistic(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      title={saved ? "Remove from favourites" : "Add to favourites"}
      className="p-1 rounded-full hover:scale-110 transition-transform disabled:opacity-50 cursor-pointer"
      disabled={loading || optimistic}
    >
      {loading || optimistic ? (
        <Loader2 className="animate-spin" size={size} />
      ) : saved ? (
        <Star className="text-orange-500 fill-orange-400" size={size} />
      ) : (
        <StarOff className="text-gray-500" size={size} />
      )}
    </button>
  );
}
