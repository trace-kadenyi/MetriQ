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
        const msg = "Failed to generate AI insights";
        setAiError(msg);
        console.error(err);
        sessionStorage.setItem(storageKey, JSON.stringify({ error: msg }));
      } finally {
        setAiLoading(false);
      }
    })();
  }, [comparison?.createdAt]);

  return { aiComparison, aiLoading, aiError };
};

export default useAiComparison;
