import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [theme, setTheme] = useState("light");

  // load theme once auth status settles
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      // logged‑in → ask backend
      api.get("/api/user/theme").then(({ data }) => {
        setTheme(data.theme || "light");
      });
    } else {
      // anonymous → localStorage
      setTheme(localStorage.getItem("theme") || "light");
    }
  }, [user, authLoading]);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // only store locally for anonymous users
    if (!user) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, user]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);

    if (user) {
      api.patch("/api/user/theme", { theme: next });
    } else {
      localStorage.setItem("theme", next);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
