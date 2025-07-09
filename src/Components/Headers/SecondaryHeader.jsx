import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Lightbulb, FolderOpen, Activity } from "lucide-react";
import clsx from "clsx";

import { FavouriteBtn } from "../Buttons/ReportButtons";
import useBreakpoint from "../../hooks/useBreakpoint";

export default function SecondaryHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const breakpoint = useBreakpoint();

  // Read ?url=... from the query string
  const params = new URLSearchParams(location.search);
  const selectedUrl = params.get("url");

  // If no URL is selected, render nothing (header stays hidden)
  if (!selectedUrl) return null;

  // Helper to navigate while preserving the selected URL
  const goTo = (path) =>
    navigate(`${path}?url=${encodeURIComponent(selectedUrl)}`);

  // Utility: shorten very long URLs for display
  let condensedUrl = selectedUrl;
  if (selectedUrl.length > 25) {
    if (breakpoint === "md") {
      condensedUrl = `${selectedUrl.slice(0, 25)}…`;
    } else {
      condensedUrl = `${selectedUrl.slice(0, 37)}…`;
    }
  }

  // re-usable nav button component
  const NavBtn = ({ path, children }) => {
    const isActive = location.pathname === path;
    return (
      <button
        onClick={() => goTo(path)}
        className={clsx(
          "flex items-center gap-1 px-2 rounded transition cursor-pointer text-xs",
          isActive ? "text-green-600 font-semibold" : "hover:text-orange-400"
        )}
      >
        {children}
      </button>
    );
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="pt-2 fixed inset-x-0 top-[160px] md:top-[60px] z-[45] bg-gray-300 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 backdrop-blur-md text-gray-800 shadow"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-sm leading-none flex-col sm:py-2 md:flex-row gap-3 dark:text-gray-100">
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
        <nav className="flex gap-2 flex-wrap min-h-[53px] justify-center  sm:flex-nowrap sm:min-h-[30px]">
          <NavBtn path="/report">
            <span className="text-orange-500 text-xl">*</span> New Report
          </NavBtn>
          <NavBtn path="/reports">
            <FolderOpen className="w-4 h-4" /> Reports
          </NavBtn>
          <NavBtn path="/charts">
            <BarChart3 className="w-4 h-4" /> Charts
          </NavBtn>
          <NavBtn path="/reports">
            <Lightbulb className="w-4 h-4" /> AI Analysis
          </NavBtn>
          <NavBtn path="/competitors">
            <Activity className="w-4 h-4" /> Competitors
          </NavBtn>
        </nav>
      </div>
    </motion.header>
  );
}
