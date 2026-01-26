import { useState } from "react";
import toast from "react-hot-toast";

import { generateSummaryInput } from "../Components/ResultsBlocks/PrevResultsBlock";
import api from "../api";

export const useAISummary = () => {
  const [aiSummary, setAiSummary] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [aiError, setAiError] = useState(false);

  /**
   * Trigger AI summary generation.
   * @param {Array} reportsArr - the unsorted reports
   */
  const handleAISummary = async (reportsArr) => {
    // toggle open/close if we already have a summary
    if (aiSummary) {
      setShowSummary((prev) => !prev);
      return;
    }

    setGeneratingSummary(true);
    setAiError(false);

    try {
      const inputText = generateSummaryInput(reportsArr);

      const { data } = await api.post("/api/summarize", {
        inputText,
      });

      setAiSummary(data.summary);
      setShowSummary(true);
    } catch (err) {
      setAiError(true);
      console.error("AI analysis failed:", err.response?.data || err.message);

      // Show specific error messages
      if (err.response?.data?.error === "QUOTA_EXCEEDED") {
        toast.error("Daily AI limit reached. Try again tomorrow.");
      } else if (err.response?.data?.error === "TIMEOUT") {
        toast.error("AI is taking too long. Try with less data.");
      } else if (err.response?.data?.error === "INVALID_API_KEY") {
        toast.error("AI service configuration error.");
      } else {
        toast.error("Failed to generate AI analysis.");
      }
    } finally {
      setGeneratingSummary(false);
    }
  };

  return {
    aiSummary,
    setAiSummary,
    generatingSummary,
    setGeneratingSummary,
    showSummary,
    setShowSummary,
    handleAISummary,
    aiError,
  };
};
