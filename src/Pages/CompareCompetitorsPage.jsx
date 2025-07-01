import { useLocation } from "react-router-dom";
import useCompareCompetitors from "../hooks/useCompareCompetitors";

const CompareCompetitorsPage = () => {
  const { search } = useLocation();
  const userSiteUrl = new URLSearchParams(search).get("url") || "";

  const {
    competitors,
    duplicateFlags,
    handleCompetitorChange,
    addCompetitor,
    removeCompetitor,
    handleCompare,
    loading,
    hasSubmitted,
    comparison,
  } = useCompareCompetitors(userSiteUrl);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-950 pt-[222px] sm:pt-[112px] p-6">
      <div className="mt-10 p-5 sm:p-10 bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-800 dark:to-blue-950 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100 underline">
          Competitor Comparison
        </h1>
        <p className="w-full md:w-2/3 text-sm text-gray-700 dark:text-gray-200 py-3 rounded-lg mb-6 leading-relaxed">
          Curious how your website stacks up? Enter one or more competitor URLs
          below to compare performance metrics like speed, SEO, and
          accessibility. We'll run a side-by-side analysis so you can see where
          you shine—and where there's room to grow.
        </p>

        {/* ------- Form ------- */}
        <div className="space-y-4 mb-8">
          {/* your site (disabled) */}
          <input
            type="text"
            value={userSiteUrl}
            disabled
            className="w-full cursor-not-allowed rounded border bg-gray-100 px-3 py-2 text-sm text-gray-500 font-bold"
          />

          {competitors.map((c, i) => (
            <div key={i} className="flex flex-col gap-1 md:gap-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label>Competitor {i + 1}</label>
                <input
                  type="text"
                  placeholder="Competitor URL"
                  value={c.url}
                  onChange={(e) =>
                    handleCompetitorChange(i, "url", e.target.value)
                  }
                  disabled={loading}
                  className={`flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring ${
                    loading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                />
                <input
                  type="text"
                  placeholder="Label (optional)"
                  value={c.label}
                  onChange={(e) =>
                    handleCompetitorChange(i, "label", e.target.value)
                  }
                  disabled={loading}
                  className={`flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring ${
                    loading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCompetitor(i)}
                    disabled={loading}
                    className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                )}
              </div>
              {/* per‑field validity message */}
              {/* per‑field validity / duplicate message */}
              {c.url && !hasSubmitted && (
                <p
                  className={
                    !duplicateFlags[i] && c.isValidFormat
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {duplicateFlags[i]
                    ? "URL matches your own site — choose a different competitor"
                    : c.isValidFormat
                    ? "URL format looks good"
                    : "Invalid URL format"}
                </p>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addCompetitor}
            disabled={loading}
            className={`rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? "bg-gray-600 text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            + Add Competitor
          </button>

          <button
            type="button"
            onClick={handleCompare}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Comparing…" : "Compare Now"}
          </button>
        </div>

        {/* ------- Results ------- */}
        {comparison && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* your site */}
            <div className="rounded-lg border p-4 shadow">
              <h2 className="text-lg font-medium mb-2">Your Site</h2>
              <p className="text-sm text-gray-500 mb-2">
                {comparison.userSiteUrl}
              </p>
              {Object.entries(comparison.userScores).map(([device, scores]) => (
                <div key={device} className="mb-2">
                  <h4 className="font-semibold capitalize">{device}</h4>
                  <ul className="text-sm space-y-0.5">
                    {Object.entries(scores).map(([k, v]) => (
                      <li key={k}>
                        {k}: {v}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* competitors */}
            {comparison.competitors.map((comp, idx) => (
              <div key={idx} className="rounded-lg border p-4 shadow">
                <h2 className="text-lg font-medium mb-2">
                  {comp.label || `Competitor ${idx + 1}`}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{comp.url}</p>
                {Object.entries(comp.scores).map(([device, scores]) => (
                  <div key={device} className="mb-2">
                    <h4 className="font-semibold capitalize">{device}</h4>
                    <ul className="text-sm space-y-0.5">
                      {Object.entries(scores).map(([k, v]) => (
                        <li key={k}>
                          {k}: {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CompareCompetitorsPage;
