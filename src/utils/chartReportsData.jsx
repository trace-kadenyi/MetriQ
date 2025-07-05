// handle charts reports data
export const chartReportsData = (reports, safeDate, parseMetric) => {
  return [...reports].reverse().map((report) => {
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

// safe date func
export const safeDate = (rawDate) => {
  if (!rawDate || typeof rawDate !== "string") return null;

  // Split date and time at ' at '
  const [datePart, timePart] = rawDate.split(" at");
  if (!datePart || !timePart) return null;

  const cleaned = `${datePart.trim()} ${timePart.trim()}`;
  const parsed = new Date(cleaned);
  return isNaN(parsed.getTime()) ? null : parsed;
};

// parse metric
export const parseMetric = (val) => {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const num = parseFloat(val.replace(/[^\d.]/g, ""));
    return isNaN(num) ? null : num;
  }
  return null;
};
