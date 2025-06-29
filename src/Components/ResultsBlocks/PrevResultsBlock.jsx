import ScoreProgress from "../Accessories/ScoreProgress";
import {
  MetricsBlock,
  scoreColour,
  borderColour,
} from "../ResultsBlocks/CurrResultsBlock";

// generate summary input
export const generateSummaryInput = (unsortedAiReports) => {
  return [...unsortedAiReports]
    .reverse() // most recent first
    .map((report, index) => {
      const m = report.metrics.mobile;
      const d = report.metrics.desktop;
      const formattedDate = new Date(report.createdAt).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      );

      return `Report ${index + 1} (${formattedDate})

Mobile Scores:
- Performance: ${report.scores.mobile.performance}
- SEO: ${report.scores.mobile.seo}
- Best Practices: ${report.scores.mobile.bestPractices}
- Accessibility: ${report.scores.mobile.accessibility}

Mobile Metrics:
- Largest Contentful Paint: ${m["Largest Contentful Paint"]?.value || "N/A"}
- First Contentful Paint: ${m["First Contentful Paint"]?.value || "N/A"}
- First Input Delay: ${m["First Input Delay"]?.value || "N/A"}
- Cumulative Layout Shift: ${m["Cumulative Layout Shift"]?.value || "N/A"}
- Speed Index: ${m["Speed Index"]?.value || "N/A"}
- Total Blocking Time: ${m["Total Blocking Time"]?.value || "N/A"}

Desktop Scores:
- Performance: ${report.scores.desktop.performance}
- SEO: ${report.scores.desktop.seo}
- Best Practices: ${report.scores.desktop.bestPractices}
- Accessibility: ${report.scores.desktop.accessibility}

Desktop Metrics:
- Largest Contentful Paint: ${d["Largest Contentful Paint"]?.value || "N/A"}
- First Contentful Paint: ${d["First Contentful Paint"]?.value || "N/A"}
- First Input Delay: ${d["First Input Delay"]?.value || "N/A"}
- Cumulative Layout Shift: ${d["Cumulative Layout Shift"]?.value || "N/A"}
- Speed Index: ${d["Speed Index"]?.value || "N/A"}
- Total Blocking Time: ${d["Total Blocking Time"]?.value || "N/A"}`;
    })
    .join("\n\n");
};

// Report section template
export const ReportSection = ({ label, icon, scores, metrics }) => (
  <div className="p-2 sm:p-4 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-inner">
    <h4
      className={`font-semibold text-lg mb-1 ${scoreColour(
        scores.performance
      )}`}
    >
      {icon} {label}
    </h4>
    <hr className={`mb-4 border-t-2 ${borderColour(scores.performance)}`} />{" "}
    <div className="flex gap-3 md:gap-5 flex-wrap justify-center  border-red-500 px-3">
      <div className="flex">
        <ScoreProgress
          performanceScore={scores.performance}
          progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
          wrapperAlign="items-center"
        />
      </div>
      <ScoreProgress
        seoScore={scores.seo}
        showDescriptions={false}
        progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
        wrapperAlign="items-center"
      />
      <ScoreProgress
        bestPracticesScore={scores.bestPractices}
        showDescriptions={false}
        progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
        wrapperAlign="items-center"
      />
      <ScoreProgress
        accessibilityScore={scores.accessibility}
        showDescriptions={false}
        progressWrapperClassName="w-14 h-14 sm:w-20 sm:h-20"
        wrapperAlign="items-center"
      />
    </div>
    <div className="bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 mt-2 px-6 py-2 rounded-xl shadow-sm">
      <MetricsBlock title="METRICS" metrics={metrics} />
    </div>
  </div>
);
