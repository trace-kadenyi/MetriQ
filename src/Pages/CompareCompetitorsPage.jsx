import { useState } from "react";
import { useLocation } from "react-router-dom";

import useCompareCompetitors from "../hooks/useCompareCompetitors";
import {
  Unavailable,
  DeviceScores,
  Generator,
} from "../Components/ResultsBlocks/CompetitorResultsBlock";
import CompetitorInputBlock from "../Components/ResultsBlocks/CompetitorInputBlock";
import CompetitorBtns, {
  ComparisonPdfBtn,
} from "../Components/Buttons/CompetitorBtns";
import {
  ActiveResults,
  ActiveCharts,
} from "../Components/ResultsBlocks/CompetitorTabsBlock";
import useAiComparison from "../hooks/useAiComparison";
import AiPane from "../Components/Accessories/Aipane";

const CompareCompetitorsPage = () => {
  const { search } = useLocation();
  const userSiteUrl = new URLSearchParams(search).get("url") || "";
  const [activeTab, setActiveTab] = useState("results");

  // usecomparecompetitors hook
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

  // useaicomparison hook
  const { aiComparison, aiLoading, aiError } = useAiComparison(
    activeTab === "analysis" ? comparison : null
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-950 pt-[272px] sm:pt-[142px] md:pt-[112px] p-6">
      <div className="mt-10 p-5 pt-10 sm:p-10 bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-950 dark:to-blue-950 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
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
        {/* Your site */}
        <div className="space-y-6 mb-10">
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

          {/* map through competitors */}
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

        {/* ------- Results / Charts / AI Tabs ------- */}
        {!loading && comparison && (
          <div className="space-y-4">
            {/* Optional “partial” notice */}
            {comparison.partial && activeTab === "results" && (
              <p className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-100 text-sm px-4 py-3 shadow-sm">
                Some sites could not be analysed – they’re marked as “Data not
                available”.
              </p>
            )}

            {/* PDF Button (clearly not under a tab) */}
            <div className="flex justify-center py-4">
              <div className="text-center space-y-2">
                <ComparisonPdfBtn
                  comparison={comparison}
                  aiAnalysis={aiComparison}
                />
              </div>
            </div>
            {/* ───────────── Tab bar */}
            <nav className="flex justify-center sm:justify-start gap-2 border-b border-gray-200 dark:border-gray-800">
              {["results", "charts", "analysis"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  type="button"
                  className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
                    activeTab === t
                      ? "bg-white dark:bg-gray-900 border-b-2 border-orange-500 text-green-600 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-orange-500"
                  }`}
                >
                  {t === "results"
                    ? "Results"
                    : t === "charts"
                    ? "Charts"
                    : "AI Analysis"}
                </button>
              ))}
            </nav>

            {/* ───────────── Pane • RESULTS */}
            {activeTab === "results" && (
              <ActiveResults
                comparison={comparison}
                DeviceScores={DeviceScores}
                Unavailable={Unavailable}
              />
            )}

            {/* ───────────── Pane • CHARTS */}
            {activeTab === "charts" && <ActiveCharts comparison={comparison} />}

            {/* ───────────── Pane • AI ANALYSIS */}
            {activeTab === "analysis" && (
              <section className="py-10">
                <AiPane
                  loading={aiLoading}
                  error={aiError}
                  markdown={aiComparison}
                />
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default CompareCompetitorsPage;
