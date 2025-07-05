import { useState } from "react";

import useCompareCompetitors from "./useCompareCompetitors";

export const useAiComparison = () => {
  const [aiComparison, setAiComparison] = useState("");
  const {
    competitors,
    duplicateFlags,
    handleCompetitorChange,
    addCompetitor,
    removeCompetitor,
    handleCompare,
    loading,
    hasSubmitted,
    comparison,
  } = useCompareCompetitors(userSiteUrl);
};
