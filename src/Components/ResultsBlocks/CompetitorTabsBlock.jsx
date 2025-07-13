import CompetitorScoreChart from "../Charts/CompetitorScoreChart";

// Active results
export const ActiveResults = ({ comparison, DeviceScores, Unavailable }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      {/* ---------- Your site ---------- */}
      <div className="relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-[0_-1px_4px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_-1px_4px_rgba(255,255,255,0.05),0_2px_6px_rgba(0,0,0,0.3)]">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 uppercase underline">
          Your Site
        </h2>
        <a
          href={comparison.userSiteUrl}
          target="_blank"
          className="block text-sm text-gray-600 dark:text-gray-300 mb-3 hover:text-orange-400 min-h-[40px] hover:underline italic"
        >
          {comparison.userSiteUrl}
        </a>

        {comparison.userScores ? (
          <div className="mt-2">
            {Object.entries(comparison.userScores).map(([device, scores]) => (
              <DeviceScores key={device} device={device} scores={scores} />
            ))}
          </div>
        ) : (
          <Unavailable />
        )}
      </div>

      {/* ---------- Competitors ---------- */}
      {comparison.competitors.map((comp, idx) => (
        <div
          key={idx}
          className="relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-[0_-1px_4px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_-1px_4px_rgba(255,255,255,0.05),0_2px_6px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute top-0 left-0 h-full w-1 rounded-s-xl bg-gradient-to-b from-orange-400 via-yellow-300 to-green-500 dark:from-orange-500 dark:via-yellow-500 dark:to-green-600" />

          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 underline">
            {comp.label || `Competitor ${idx + 1}`}
          </h2>
          <a
            href={comp.url}
            target="_blank"
            className="block text-sm text-gray-600 dark:text-gray-300 mb-3 hover:text-orange-400 min-h-[40px] hover:underline italic"
          >
            {comp.url}
          </a>

          {comp.error || !comp.scores ? (
            <Unavailable />
          ) : (
            <div className="mt-2">
              {Object.entries(comp.scores).map(([device, scores]) => (
                <DeviceScores key={device} device={device} scores={scores} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Active charts
const metrics = ["performance", "seo", "bestPractices", "accessibility"];

export const ActiveCharts = ({ comparison }) => {
  if (!comparison) return null;

  return (
    <section className="pt-4">
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
        Visual comparison of your site versus selected competitors across
        Lighthouse categories{" "}
        <span className="font-semibold italic">
          (Performance, SEO, Best Practices, Accessibility)
        </span>
        .
      </p>

      {metrics.map((metric) => (
        <CompetitorScoreChart
          key={metric}
          comparison={comparison}
          metric={metric}
        />
      ))}
    </section>
  );
};
