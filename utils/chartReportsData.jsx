export const chartReportsData = (reports, safeDate, parseMetric) => {
  return reports.map((report) => {
    const m = report.metrics.mobile;
    const d = report.metrics.desktop;

    return {
      date: safeDate(report.createdAt),

      // Scores
      mobilePerformance: report.scores.mobile.performance,
      desktopPerformance: report.scores.desktop.performance,
      mobileSEO: report.scores.mobile.seo,
      desktopSEO: report.scores.desktop.seo,
      mobileBP: report.scores.mobile.bestPractices,
      desktopBP: report.scores.desktop.bestPractices,
      mobileAccessibility: report.scores.mobile.accessibility,
      desktopAccessibility: report.scores.desktop.accessibility,

      // Core Web Vitals
      mobileLCP: parseMetric(m["Largest Contentful Paint"]?.value),
      desktopLCP: parseMetric(d["Largest Contentful Paint"]?.value),
      mobileFID: parseMetric(m["First Input Delay"]?.value),
      desktopFID: parseMetric(d["First Input Delay"]?.value),
      mobileCLS: parseMetric(m["Cumulative Layout Shift"]?.value),
      desktopCLS: parseMetric(d["Cumulative Layout Shift"]?.value),
    };
  });
};
