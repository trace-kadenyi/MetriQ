const CompetitorInputBlock = ({
  c,
  i,
  handleCompetitorChange,
  loading,
  removeCompetitor,
  duplicateFlags,
  hasSubmitted,
}) => {
  return (
    <div
      key={i}
      className="space-y-2 border-l-4 border-green-500 dark:border-green-900 
             bg-white shadow-sm dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-900 
             dark:shadow-md pl-4 rounded-md px"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <label className="text-xs font-semibold text-gray-800 dark:text-gray-200">
          Competitor {i + 1}
        </label>
        <input
          type="text"
          placeholder="Enter Competitor's URL"
          value={c.url}
          onChange={(e) => handleCompetitorChange(i, "url", e.target.value)}
          disabled={loading}
          className={`flex-1 rounded-md border bg-white dark:bg-gray-900 dark:text-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
            loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
          }`}
        />
        <input
          type="text"
          placeholder="Label (optional)"
          value={c.label}
          onChange={(e) => handleCompetitorChange(i, "label", e.target.value)}
          disabled={loading}
          className={`flex-1 rounded-md border bg-white dark:bg-gray-900 dark:text-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
            loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
          }`}
        />
        {i > 0 && (
          <button
            type="button"
            onClick={() => removeCompetitor(i)}
            disabled={loading}
            className="rounded-md bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white text-xs px-2 py-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Remove
          </button>
        )}
      </div>
      {c.url && !hasSubmitted && (
        <p
          className={`text-sm ${
            !duplicateFlags[i] && c.isValidFormat
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {duplicateFlags[i]
            ? "URL matches your own site — choose a different competitor"
            : c.isValidFormat
            ? "URL format looks good"
            : "Invalid URL format"}
        </p>
      )}
    </div>
  );
};

export default CompetitorInputBlock;
