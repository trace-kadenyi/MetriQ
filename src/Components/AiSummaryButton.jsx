const AISummaryButton = ({
  onClick,
  disabled,
  aiSummary,
  showSummary,
  generatingSummary,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="min-w-[12rem] sm:min-w-[14rem] md:min-w-[16rem] bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded shadow hover:opacity-90 disabled:opacity-60 cursor-pointer flex items-center gap-2 justify-center"
  >
    {generatingSummary ? (
      <>
        <svg
          className="w-5 h-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Generating...
      </>
    ) : aiSummary && showSummary ? (
      "🙈 Hide AI Analysis"
    ) : aiSummary && !showSummary ? (
      "👁️ Show AI Analysis"
    ) : (
      "🧠 Generate AI Analysis"
    )}
  </button>
);

export default AISummaryButton;
