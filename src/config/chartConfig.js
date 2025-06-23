export const metricDescriptions = {
  mobilePerformance: "Mobile performance score (0–100)",
  desktopPerformance: "Desktop performance score (0–100)",
  mobileSEO: "Mobile SEO score",
  desktopSEO: "Desktop SEO score",
  mobileAccessibility: "Mobile accessibility score",
  desktopAccessibility: "Desktop accessibility score",
  mobileBP: "Mobile best practices score",
  desktopBP: "Desktop best practices score",
  mobileLCP: "Largest Contentful Paint on mobile (ideal < 2.5s)",
  desktopLCP: "Largest Contentful Paint on desktop (ideal < 2.5s)",
  mobileFID: "First Input Delay on mobile (ideal < 100ms)",
  desktopFID: "First Input Delay on desktop (ideal < 100ms)",
  mobileCLS: "Cumulative Layout Shift on mobile (ideal < 0.1)",
  desktopCLS: "Cumulative Layout Shift on desktop (ideal < 0.1)",
};

export const benchmarkLines = {
  mobileLCP: 2.5,
  desktopLCP: 2.5,
  mobileFID: 100,
  desktopFID: 100,
  mobileCLS: 0.1,
  desktopCLS: 0.1,
};

export const colors = {
  mobile: "#fb923c", // orange
  desktop: "#22c55e", // green
};

export const scorePoorThresholds = {
  mobilePerformance: 50,
  desktopPerformance: 50,
  mobileSEO: 50,
  desktopSEO: 50,
  mobileAccessibility: 50,
  desktopAccessibility: 50,
  mobileBP: 50,
  desktopBP: 50,
};
