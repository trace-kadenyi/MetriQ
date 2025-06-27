import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full dark:border dark:border-gray-600"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
