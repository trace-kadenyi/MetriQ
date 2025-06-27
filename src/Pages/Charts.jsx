import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import errorGif from "../assets/error.gif";
import { ErrorTemp, Loader } from "../Components/ResultsBlocks/CurrResultsBlock";
import preloader from "../assets/preloader_gif.gif";
import { useFetchReports } from "../hooks/fetchPrevReports";
import { formatReports } from "../utils/formatReports";
import ScoreChartWithToggles from "../Components/Toggles/ScoreChartWithToggles";
import {
  chartReportsData,
  safeDate,
  parseMetric,
} from "../utils/chartReportsData";
import CoreVitalChart from "../Components/Charts/CoreVitalChart";
import { WarningBox } from "../utils/warningBox";

const Charts = () => {
  const [prevReports, setPrevReports] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  // fetch previous reports
  const fetchReports = useFetchReports({
    url,
    setLoading,
    setPrevReports,
    setErrorOccurred,
  });
  useEffect(() => {
    if (url) fetchReports();
  }, [url]);

  // memoize data/formatted reports
  const memoizedData = useMemo(() => formatReports(prevReports), [prevReports]);

  // Chart data
  const chartData = useMemo(
    () => chartReportsData(memoizedData, safeDate, parseMetric),
    [memoizedData]
  );

  // loading
  if (loading) return <Loader src={preloader} />;

  return (
    <main
      className="min-h-screen bg-gray-50 relative pt-[252px] sm:pt-[112px]"
      role="main"
    >
      {/* error message */}
      {errorOccurred ? (
        <ErrorTemp url={url} errorGif={errorGif} />
      ) : (
        // main content
        <div className="m-2 sm:m-10 p-5 sm:p-10 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <section>
            <h2 className="font-semibold text-lg text-gray-800 underline max-w-[80vw] my-4 break-words">
              Chart analysis page for:{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={url}
                aria-label={`Open ${url} in a new tab`}
                className="hover:text-orange-400"
              >
                {url}
              </a>
            </h2>
            <p className="text-sm text-gray-700 py-3 rounded-lg mb-6 leading-relaxed">
              Below, you'll find visual representations of your website's
              Lighthouse scores and Core Web Vitals over time. These help you
              track progress and identify trends in performance, accessibility,
              best practices, and SEO — for both mobile and desktop versions.
            </p>
          </section>
          {/* Scores section */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Lighthouse Category Scores
            </h2>
            <p className="text-sm text-gray-700 py-3 rounded-lg mb-6 leading-relaxed">
              This chart displays trends in your site's core Lighthouse
              categories:
              <strong> Performance</strong>, <strong>Accessibility</strong>,{" "}
              <strong>Best Practices</strong>, and <strong>SEO</strong>. Toggle
              each line on or off using the checkboxes to focus on specific
              metrics across devices.
            </p>
            {prevReports.length > 1 ? (
              <ScoreChartWithToggles
                title="Scores: Performance, Accessibility, Best Practices, SEO"
                quality="Good score: > 50"
                data={chartData}
                lines={[
                  {
                    key: "mobilePerformance",
                    label: "Performance",
                    device: "mobile",
                  },
                  {
                    key: "desktopPerformance",
                    label: "Performance",
                    device: "desktop",
                  },
                  { key: "mobileSEO", label: "SEO", device: "mobile" },
                  { key: "desktopSEO", label: "SEO", device: "desktop" },
                  {
                    key: "mobileBP",
                    label: "Best Practices",
                    device: "mobile",
                  },
                  {
                    key: "desktopBP",
                    label: "Best Practices",
                    device: "desktop",
                  },
                  {
                    key: "mobileAccessibility",
                    label: "Accessibility",
                    device: "mobile",
                  },
                  {
                    key: "desktopAccessibility",
                    label: "Accessibility",
                    device: "desktop",
                  },
                ]}
              />
            ) : (
              <WarningBox />
            )}
          </section>
          {/* Core Web Vitals Section */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Core Web Vitals (CWV)
            </h2>
            <p className="text-sm text-gray-700 py-3 rounded-lg mb-6 leading-relaxed">
              Monitor the three key Core Web Vitals:{" "}
              <strong>Largest Contentful Paint (LCP)</strong>,{" "}
              <strong>First Input Delay (FID)</strong>, and{" "}
              <strong>Cumulative Layout Shift (CLS)</strong>. These are
              essential for user experience and are part of Google's ranking
              signals.
            </p>

            {prevReports.length > 1 ? (
              <div>
                (
                <CoreVitalChart
                  title="Largest Contentful Paint (LCP)"
                  description="Measures how long it takes for the largest visible content (e.g. image or heading) to appear on screen."
                  quality="Good: ≤ 2.5 seconds"
                  unit="ms"
                  yDomain={[0, 5]}
                  data={chartData}
                  lines={[
                    { key: "mobileLCP", label: "LCP", device: "mobile" },
                    { key: "desktopLCP", label: "LCP", device: "desktop" },
                  ]}
                />
                <CoreVitalChart
                  title="First Input Delay (FID)"
                  description="Measures the time from when a user first interacts with your page (click/tap/keypress) to when the browser responds."
                  quality="Good: ≤ 100 milliseconds"
                  unit="ms"
                  yDomain={[0, 300]}
                  data={chartData}
                  lines={[
                    { key: "mobileFID", label: "FID", device: "mobile" },
                    { key: "desktopFID", label: "FID", device: "desktop" },
                  ]}
                />
                <CoreVitalChart
                  title="Cumulative Layout Shift (CLS)"
                  description="Measures unexpected visual shifts of content during page load."
                  quality="Good: ≤ 0.1"
                  unit=""
                  yDomain={[0, 0.3]}
                  data={chartData}
                  lines={[
                    { key: "mobileCLS", label: "CLS", device: "mobile" },
                    { key: "desktopCLS", label: "CLS", device: "desktop" },
                  ]}
                />
              </div>
            ) : (
              <WarningBox />
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default Charts;
