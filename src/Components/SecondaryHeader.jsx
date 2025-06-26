import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  Lightbulb,
  FilePlus,
  FolderOpen,
  Star,
} from "lucide-react";

import { FavouriteBtn } from "./ReportButtons";

export default function SecondaryHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read ?url=... from the query string
  const params = new URLSearchParams(location.search);
  const selectedUrl = params.get("url");

  // If no URL is selected, render nothing (header stays hidden)
  if (!selectedUrl) return null;

  // Helper to navigate while preserving the selected URL
  const goTo = (path) =>
    navigate(`${path}?url=${encodeURIComponent(selectedUrl)}`);

  // Utility: shorten very long URLs for display
  const condensedUrl =
    selectedUrl.length > 40 ? `${selectedUrl.slice(0, 37)}…` : selectedUrl;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="pt-2 fixed inset-x-0 top-[160px] sm:top-[60px] z-[45] bg-gray-300 backdrop-blur-md text-gray-800 shadow"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-sm leading-none flex-col sm:py-2 sm:flex-row gap-3">
        {/* Selected URL */}
        <span className="font-semibold truncate" title={selectedUrl}>
          <a
            href={condensedUrl}
            target="_blank"
            className="underline hover:text-orange-400"
          >
            {condensedUrl}
          </a>
          <FavouriteBtn url={selectedUrl} />
        </span>

        {/* Quick nav */}
        <nav className="flex gap-4">
          <button
            onClick={() => goTo("/report")}
            className="flex items-center gap-1 hover:text-orange-400 transition cursor-pointer"
          >
            <span className="text-orange-500 text-xl">*</span>
            New Report
          </button>
          <button
            onClick={() => goTo("/charts")}
            className="flex items-center gap-1 hover:text-orange-400 transition cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" /> Charts
          </button>
          <button
            onClick={() => goTo("/reports")}
            className="flex items-center gap-1 hover:text-orange-400 transition cursor-pointer"
          >
            <FolderOpen className="w-4 h-4" /> Reports
          </button>
          <button
            onClick={() => goTo("/reports")}
            className="flex items-center gap-1 hover:text-orange-400 transition cursor-pointer"
          >
            <Lightbulb className="w-4 h-4" /> AI Analysis
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
