// handle unavailable
export const Unavailable = () => (
  <p className="text-red-600 text-sm italic">Data not available</p>
);
// handle device scores
export const DeviceScores = ({ device, scores }) => (
  <div className="mb-2 dark:text-gray-200">
    <h4 className="font-semibold capitalize">{device}</h4>
    <ul className="text-sm space-y-0.5">
      {Object.entries(scores).map(([k, v]) => (
        <li key={k}>
          {k}: {v}
        </li>
      ))}
    </ul>
  </div>
);

// handle generator
export const Generator = () => {
  return (
    <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm border border-blue-200 dark:border-blue-700 shadow-sm">
      <p className="flex items-center gap-2">
        <svg
          className="w-4 h-4 animate-spin text-blue-500 dark:text-blue-300"
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

// handle buttons
export const CompetitorBtns = ({
  competitors,
  loading,
  addCompetitor,
  handleCompare,
}) => {
  return (
    <div className="flex gap-3">
      {competitors.length < 3 && !loading && (
        <button
          type="button"
          onClick={addCompetitor}
          disabled={loading}
          className="inline-block rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Competitor
        </button>
      )}

      <button
        type="button"
        onClick={handleCompare}
        disabled={loading}
        className={`${
          !loading
            ? "w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold text-white dark:text-gray-100 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-gray-400 dark:hover:text-blue-700 flex items-center justify-center gap-2 cursor-pointer"
            : "hidden"
        }`}
      >
        Compare
      </button>
    </div>
  );
};
