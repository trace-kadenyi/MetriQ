import { useState } from "react";
import toast from "react-hot-toast";

import { generateSummaryInput } from "../Components/ResultsBlocks/PrevResultsBlock";
import api from "../api";

export const useAISummary = () => {
  const [aiSummary, setAiSummary] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

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
    try {
      const inputText = generateSummaryInput(reportsArr);

      const { data } = await api.post("/api/summarize", {
        inputText,
      });

      setAiSummary(data.summary);
      setShowSummary(true);
    } catch (err) {
      console.error("AI analysis failed:", err);
      toast.error("Failed to generate AI analysis.");
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
  };
};
