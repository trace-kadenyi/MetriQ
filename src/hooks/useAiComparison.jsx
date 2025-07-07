import { useEffect, useState, useRef } from "react";
import api from "../api";

/**
 * Custom hook to fetch and cache AI competitor analysis.
 *
 * @param {object|null} comparison – the comparison object returned by useCompareCompetitors.
 * @returns {object} { aiComparison, aiLoading, aiError }
 */
const useAiComparison = (comparison) => {
  const [aiComparison, setAiComparison] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // remember which comparison.createdAt has already been fetched
  const fetchedKeyRef = useRef(null);

  useEffect(() => {
    if (!comparison) return;

    const key = comparison.createdAt;
    if (!key || key === fetchedKeyRef.current) return; // already fetched for this run

    setAiComparison("");
    setAiError(null);
    setAiLoading(true);

    (async () => {
      try {
        const { data } = await api.post("/api/ai/comparison", { comparison });
        // strip accidental ```markdown fences so the markdown renderer works
        const unwrap = (str) => str.replace(/^```[a-z]*\n?|```$/g, "").trim();
        setAiComparison(unwrap(data.analysis));
        fetchedKeyRef.current = key;
      } catch (err) {
        setAiError("Failed to generate AI insights");
        console.error(err);
      } finally {
        setAiLoading(false);
      }
    })();
  }, [comparison?.createdAt]);

  return { aiComparison, aiLoading, aiError };
};

export default useAiComparison;
