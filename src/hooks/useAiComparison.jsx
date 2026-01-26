import { useEffect, useState, useRef } from "react";

import api from "../api";

/**
 * Custom hook: fetch AI competitor analysis once per comparison run **and**
 * cache it in sessionStorage so Vite hot‑reload or route reloads don’t fire
 * additional API calls.
 *
 * @param {object|null} comparison – the comparison object from useCompareCompetitors
 * @returns {object} { aiComparison, aiLoading, aiError }
 */
const useAiComparison = (comparison) => {
  const [aiComparison, setAiComparison] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const fetchedKeyRef = useRef(null);

  useEffect(() => {
    if (!comparison) return;

    const key = comparison.createdAt;
    if (!key) return;

    const storageKey = `aiComparison-${key}`;
    const cached = sessionStorage.getItem(storageKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      setAiComparison(parsed.analysis || "");
      setAiError(parsed.error || null);
      fetchedKeyRef.current = key;
      return;
    }

    if (key === fetchedKeyRef.current) return;

    setAiComparison("");
    setAiError(null);
    setAiLoading(true);

    (async () => {
      try {
        const { data } = await api.post("/api/ai/comparison", { comparison });
        const unwrap = (str) => str.replace(/^```[a-z]*\n?|```$/g, "").trim();
        const analysis = unwrap(data.analysis);
        setAiComparison(analysis);
        sessionStorage.setItem(storageKey, JSON.stringify({ analysis }));
        fetchedKeyRef.current = key;
      } catch (err) {
        const backendError = err.response?.data?.error;
        const backendMessage = err.response?.data?.message || err.message;

        let errorType;

        if (
          backendError === "RATE_LIMIT" ||
          backendError === "QUOTA_EXCEEDED"
        ) {
          errorType = "RATE_LIMIT";
        } else if (backendError === "TIMEOUT") {
          errorType = "TIMEOUT";
        } else if (
          backendMessage?.includes("quota") ||
          backendMessage?.includes("limit")
        ) {
          errorType = "RATE_LIMIT";
        } else if (
          backendMessage?.includes("timeout") ||
          err.code === "ECONNABORTED"
        ) {
          errorType = "TIMEOUT";
        } else if (
          backendMessage?.includes("API key") ||
          backendMessage?.includes("authentication")
        ) {
          errorType = "INVALID_API_KEY";
        } else {
          errorType = "Failed to generate AI insights";
        }

        setAiError(errorType);
        console.error("AI competitor analysis failed:", backendMessage);

        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            error: errorType,
            details: backendMessage,
          }),
        );
      } finally {
        setAiLoading(false);
      }
    })();
  }, [comparison?.createdAt]);

  return { aiComparison, aiLoading, aiError };
};

export default useAiComparison;
