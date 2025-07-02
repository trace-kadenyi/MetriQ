// handle score colours
export const renderCompetitorScores = (score) => {
  if (score === null || score === undefined) return "text-gray-900";
  if (score >= 80) return "text-green-500";
  if (score >= 50) return "text-orange-400";
  return "text-red-500";
};

// format metric name
const formatMetricName = (str) => {
  return str
    .replace(/([A-Z])/g, " $1") // insert space before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
};

// handle unavailable
export const Unavailable = () => (
  <p className="text-red-600 text-sm italic font-semibold">
    Data not available
  </p>
);

// handle device scores
export const DeviceScores = ({ device, scores }) => (
  <div className="mb-2 flex-1 min-w-[10rem] dark:text-gray-200">
    <h4
      className={`font-semibold capitalize underline mb-1 ${renderCompetitorScores(
        scores.performance
      )}`}
    >
      {device}
    </h4>
    <ul className="text-sm space-y-0.5 flex gap-3 flex-wrap">
      {Object.entries(scores).map(([k, v]) => (
        <li key={k}>
          <span className="font-semibold">{formatMetricName(k)}</span>:{" "}
          <span className={`font-semibold ${renderCompetitorScores(v)}`}>
            {v}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// handle generator
export const Generator = () => {
  return (
    <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm border border-blue-200 dark:border-blue-700 shadow-sm">
      <p className="flex items-center gap-2 flex-col sm:flex-row">
        <svg
          className="w-6 h-6 sm:w-4 h-4 animate-spin text-blue-500 dark:text-blue-300"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Generating your comparison report from PageSpeed Insights. This may take
        a few minutes...
      </p>
    </div>
  );
};
