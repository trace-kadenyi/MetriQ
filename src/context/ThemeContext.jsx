import { createContext, useContext, useEffect, useState } from "react";
import api from "../api.js";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  // ✅ Prime from localStorage to reduce flash
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Load theme once auth status settles
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      // Logged‑in → ask backend
      api.get("/api/user/theme").then(({ data }) => {
        setTheme(data.theme || "light");
      });
    } else {
      // Anonymous → already set from localStorage, no action needed
    }
  }, [user, authLoading]);

  // Apply theme class and always write to localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme); // ✅ always store locally
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next); // ✅ always update localStorage

    if (user) {
      api.patch("/api/user/theme", { theme: next });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
