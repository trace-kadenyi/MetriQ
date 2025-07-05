import { useMemo } from "react";

// memoized report
export const useMemoizedReport = (report, latestReport, view) => {
  return useMemo(() => {
    if (!report) return {};

    const {
      scores: { mobile, desktop },
      metrics: { mobile: mobileMetrics, desktop: desktopMetrics },
      suggestions: { mobile: mobileSuggestions, desktop: desktopSuggestions },
    } = latestReport;

    const isMobile = view === "mobile";

    return {
      deviceData: isMobile ? mobileMetrics : desktopMetrics,
      performanceScore: isMobile ? mobile.performance : desktop.performance,
      seoScore: isMobile ? mobile.seo : desktop.seo,
      accessibilityScore: isMobile
        ? mobile.accessibility
        : desktop.accessibility,
      bestPracticesScore: isMobile
        ? mobile.bestPractices
        : desktop.bestPractices,
      suggestions: isMobile ? mobileSuggestions : desktopSuggestions,
    };
  }, [latestReport, view]);
};
