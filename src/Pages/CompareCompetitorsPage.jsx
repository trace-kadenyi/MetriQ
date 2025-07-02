import { useLocation } from "react-router-dom";

import useCompareCompetitors from "../hooks/useCompareCompetitors";
import {
  Unavailable,
  DeviceScores,
  Generator,
  CompetitorBtns,
} from "../Components/ResultsBlocks/CompetitorResultsBlock";
import CompetitorInputBlock from "../Components/ResultsBlocks/CompetitorInputBlock";

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
    <main className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-950 pt-[272px] sm:pt-[142px] md:pt-[112px] p-6">
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
        <div className="space-y-6 mb-10">
          {/* your site (disabled) */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Your Site
            </label>
            <input
              type="text"
              value={`${userSiteUrl} (locked)`}
              disabled
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 cursor-not-allowed"
            />
          </div>

          {competitors.map((c, i) => (
            <CompetitorInputBlock
              key={i}
              c={c}
              i={i}
              handleCompetitorChange={handleCompetitorChange}
              loading={loading}
              removeCompetitor={removeCompetitor}
              duplicateFlags={duplicateFlags}
              hasSubmitted={hasSubmitted}
            />
          ))}
          {/* Add competitor and Compare buttons */}
          <CompetitorBtns
            competitors={competitors}
            loading={loading}
            addCompetitor={addCompetitor}
            handleCompare={handleCompare}
          />
        </div>

        {/* loader */}
        {loading && <Generator />}

        {/* ------- Results ------- */}
        {!loading && comparison && (
          <div className="space-y-4">
            {/* 🔔 global notice if response was partial */}
            {comparison.partial && (
              <p className="rounded bg-yellow-100 text-yellow-800 text-sm p-3">
                Some sites could not be analysed – they’re marked as “Data not
                available”.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ---------- Your site ---------- */}
              <div className="rounded-lg border p-4 shadow">
                <h2 className="text-lg font-medium mb-2">Your Site</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {comparison.userSiteUrl}
                </p>

                {/* ‑‑ handle the unlikely case your own site failed ‑‑ */}
                {comparison.userScores ? (
                  Object.entries(comparison.userScores).map(
                    ([device, scores]) => (
                      <DeviceScores
                        key={device}
                        device={device}
                        scores={scores}
                      />
                    )
                  )
                ) : (
                  <Unavailable />
                )}
              </div>

              {/* ---------- Competitors ---------- */}
              {comparison.competitors.map((comp, idx) => (
                <div key={idx} className="rounded-lg border p-4 shadow">
                  <h2 className="text-lg font-medium mb-2">
                    {comp.label || `Competitor ${idx + 1}`}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{comp.url}</p>

                  {comp.error || !comp.scores ? (
                    <Unavailable />
                  ) : (
                    Object.entries(comp.scores).map(([device, scores]) => (
                      <DeviceScores
                        key={device}
                        device={device}
                        scores={scores}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CompareCompetitorsPage;
