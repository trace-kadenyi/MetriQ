// handle buttons
const CompetitorBtns = ({
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
          className="w-full sm:w-auto 1inline-block rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CompetitorBtns;
