import { useLocation } from "react-router-dom";

import useCompareCompetitors from "../hooks/useCompareCompetitors";
import {
  Unavailable,
  DeviceScores,
  Generator,
} from "../Components/ResultsBlocks/CompetitorResultsBlock";
import CompetitorInputBlock from "../Components/ResultsBlocks/CompetitorInputBlock";
import CompetitorBtns from "../Components/Buttons/CompetitorBtns";
import { CompetitorScoreChart } from "../Components/Charts/CompetitorScoreChart";

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
      <div className="mt-10 p-5 pt-10 sm:p-10 bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-800 dark:to-blue-950 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
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
            {comparison.partial && (
              <p className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-100 text-sm px-4 py-3 shadow-sm">
                Some sites could not be analysed – they’re marked as “Data not
                available”.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ---------- Your site ---------- */}
              <div className="relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-[0_-1px_4px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_-1px_4px_rgba(255,255,255,0.05),0_2px_6px_rgba(0,0,0,0.3)]">
                <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-1 uppercase underline">
                  Your Site
                </h2>
                <a
                  href={`${comparison.userSiteUrl}`}
                  target="_blank"
                  className="text-sm text-gray-600 dark:text-gray-300 mb-3 hover:text-orange-400 hover:underline italic"
                >
                  {comparison.userSiteUrl}
                </a>

                {comparison.userScores ? (
                  <div className="mt-2">
                    {Object.entries(comparison.userScores).map(
                      ([device, scores]) => (
                        <DeviceScores
                          key={device}
                          device={device}
                          scores={scores}
                        />
                      )
                    )}
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
                  <div
                    className="absolute top-0 left-0 h-full w-1 rounded-s-xl
             bg-gradient-to-b from-orange-400 via-yellow-4=200 to-green-500
             dark:from-orange-500 dark:via-yellow-500 dark:to-green-600"
                  />

                  <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-1 underline">
                    {comp.label || `Competitor ${idx + 1}`}
                  </h2>
                  <a
                    href={`${comp.url}`}
                    target="_blank"
                    className="text-sm text-gray-600 dark:text-gray-300 mb-3 hover:text-orange-400 hover:underline italic"
                  >
                    {comp.url}
                  </a>

                  {comp.error || !comp.scores ? (
                    <Unavailable />
                  ) : (
                    <div className="mt-2">
                      {Object.entries(comp.scores).map(([device, scores]) => (
                        <DeviceScores
                          key={device}
                          device={device}
                          scores={scores}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Charts */}
        {!loading && comparison && (
          <section>
            {["performance", "seo", "bestPractices", "accessibility"].map(
              (metric) => (
                <CompetitorScoreChart
                  key={metric}
                  comparison={comparison}
                  metric={metric}
                />
              )
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default CompareCompetitorsPage;
