import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import errorGif from "../assets/error.gif";
import {
  ErrorTemp,
  Loader,
} from "../Components/ResultsBlocks/CurrResultsBlock";
import preloader from "../assets/preloader_gif.gif";
import { WarningBox } from "../utils/warningBox";
import { CompetitorScoreChart } from "../Components/Charts/CompetitorScoreChart";

const CompetitorChartsPage = () => {
  const { state, search } = useLocation(); // ✅ FIXED: include `search`
  const userSiteUrl = new URLSearchParams(search).get("url") || "";
  const comparison = state?.comparison;

  const [errorOccurred, setErrorOccurred] = useState(false);
  const loading = false; // Assuming no loading here; update as needed

  // loading
  if (loading) return <Loader src={preloader} />;

  return (
    <main
      className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-950 relative pt-[302px] sm:pt-[142px] md:pt-[112px] pb-4"
      role="main"
    >
      {errorOccurred ? (
        <ErrorTemp url={userSiteUrl} errorGif={errorGif} />
      ) : (
        <div className="m-2 sm:m-10 p-5 sm:p-10 bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-800 dark:to-blue-950 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <section>
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 underline max-w-[80vw] my-4 break-words">
              Competitor Chart Comparison for:{" "}
              <a
                href={userSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={userSiteUrl}
                aria-label={`Open ${userSiteUrl} in a new tab`}
                className="hover:text-orange-400"
              >
                {userSiteUrl}
              </a>
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-200 py-3 rounded-lg mb-6 leading-relaxed">
              This page presents a visual comparison of your website’s scores
              against selected competitors. Explore how you rank across key
              Lighthouse categories — Performance, SEO, Best Practices, and
              Accessibility — on both mobile and desktop. Use these insights to
              identify strengths, pinpoint weaknesses, and guide your
              optimization strategy.
            </p>
          </section>

          {comparison ? (
            ["performance", "seo", "bestPractices", "accessibility"].map(
              (m) => (
                <CompetitorScoreChart
                  key={m}
                  comparison={comparison}
                  metric={m}
                />
              )
            )
          ) : (
            <p>No data — please go back and run a comparison first.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default CompetitorChartsPage;
