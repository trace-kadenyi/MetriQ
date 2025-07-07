import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <div
      className={`relative inline-block group  ${
        isLandingPage ? "max-sm:fixed max-sm:top-3 max-sm:right-3 z-[100]" : ""
      }`}
    >
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full border border-transparent dark:border-gray-600 cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="text-orange-400" />
        ) : (
          <Moon className="text-white" /> 
        )}
      </button>
      {/* Hidden paragraph that appears on hover */}
      <p className="absolute top-full right-0 right edge mt-2 bg-white dark:bg-gray-400 text-gray-800 font-semibold text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </p>
    </div>
  );
};

export default ThemeToggle;
