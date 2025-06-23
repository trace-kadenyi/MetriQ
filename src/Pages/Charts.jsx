import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";


import errorGif from "../assets/error.gif";
import { ErrorTemp, Loader } from "../Components/ResultsBlock";
import preloader from "../assets/preloader_gif.gif";
import { useFetchReports } from "../hooks/fetchPrevReports";
import { formatReports } from "../utils/formatReports";
import MetricChartWithToggles from "../Components/MetricChartWithToggles";
import { chartReportsData, safeDate, parseMetric } from "../utils/chartReportsData";

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
    <main className="min-h-screen bg-gray-50 relative" role="main">
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
            <h2 className="text-md font-semibold text-gray-800 mb-2">
              Lighthouse Category Scores
            </h2>
            <p className="text-sm text-gray-700 py-3 rounded-lg mb-6 leading-relaxed">
              This chart displays trends in your site's core Lighthouse
              categories:
              <strong> Performance</strong>, <strong>Accessibility</strong>,{" "}
              <strong>Best Practices</strong>, and <strong>SEO</strong>. Toggle
              each line on or off using the checkboxes to focus on specific metrics across devices.
            </p>
            <MetricChartWithToggles
              title="Scores: Performance, Accessibility, Best Practices, SEO"
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
                { key: "mobileBP", label: "Best Practices", device: "mobile" },
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
          </section>
          {/* Core Web Vitals Section */}
          <section className="mb-12">
            <h2 className="text-md font-semibold text-gray-800 mb-2">
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
            <MetricChartWithToggles
              title="Core Web Vitals: Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)"
              data={chartData}
              lines={[
                { key: "mobileLCP", label: "LCP", device: "mobile" },
                { key: "desktopLCP", label: "LCP", device: "desktop" },
                { key: "mobileFID", label: "FID", device: "mobile" },
                { key: "desktopFID", label: "FID", device: "desktop" },
                { key: "mobileCLS", label: "CLS", device: "mobile" },
                { key: "desktopCLS", label: "CLS", device: "desktop" },
              ]}
            />
          </section>
        </div>
      )}
    </main>
  );
};

export default Charts;
