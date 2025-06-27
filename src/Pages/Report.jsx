import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import { useFetchCurrReport } from "../hooks/fetchCurrentReport";
import {
  MetricsBlock,
  getStatusColor,
  renderVital,
  getOpportunityStatus,
  Loader,
} from "../Components/ResultsBlocks/CurrResultsBlock";
import ScoreProgress from "../Components/Accessories/ScoreProgress";
import preloader from "../assets/preloader_gif.gif";
import { useMemoizedReport } from "../hooks/useMemoizedReport";
import DeviceToggle from "../Components/Toggles/DeviceToggle";

const Report = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [report, setReport] = useState(null);
  const [latestReport, setLatestReport] = useState(null);
  const [view, setView] = useState("mobile");

  const navigate = useNavigate();

  const fetchReport = useFetchCurrReport(url, setReport, setLatestReport);

  // fetch report
  useEffect(() => {
    if (url) fetchReport();
  }, [url]);

  // 2. Safely memoize values only when report is available
  const memoizedData = useMemoizedReport(report, latestReport, view);

  const {
    deviceData,
    performanceScore,
    seoScore,
    accessibilityScore,
    bestPracticesScore,
    suggestions,
  } = memoizedData;

  // preloader
  if (!latestReport) return <Loader src={preloader} />;

  return (
    <main
      className="min-h-screen bg-gray-50 relative pt-[222px] sm:pt-[112px]"
      role="main"
    >
      <div className="m-10 p-5 sm:p-10 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <section className="sticky top-[255px] z-[44] bg-gray-100 border-b border-gray-300 shadow-sm rounded-t-xl sm:top-[108px]">
          <div className="flex justify-center px-6 py-3">
            <DeviceToggle view={view} setView={setView} />
          </div>
        </section>

        {/* Score progress and core web vitals */}
        <section className="mt-10 gap-3 flex md:items-center justify-between lg:px-20 flex-col md:flex-row p-5 bg-gray-50 rounded-xl shadow-sm space-y-4">
          <div
            className="w-24 text-center transition-transform duration-200 hover:scale-[1.02]"
            role="progressbar"
            aria-valuenow={performanceScore}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <ScoreProgress performanceScore={performanceScore} />
          </div>
          <div>
            <h4 className="underline my-2 text-sm font-semibold">
              Core Web Vitals
            </h4>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="p-3 rounded-md bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[0.90] duration-200">
                {renderVital(
                  "LCP",
                  "Largest Contentful Paint",
                  getStatusColor,
                  deviceData
                )}
              </div>
              <div className="p-3 rounded-md bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[0.90] duration-200">
                {renderVital(
                  "First Input Delay",
                  "First Input Delay",
                  getStatusColor,
                  deviceData
                )}
              </div>
              <div className="p-3 rounded-md bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[0.90] duration-200">
                {renderVital(
                  "Cumulative Layout Shift",
                  "Cumulative Layout Shift",
                  getStatusColor,
                  deviceData
                )}
              </div>
            </div>
          </div>
        </section>
        {/* <hr className="text-gray-200 my-5" /> */}
        {/* Metrics block */}
        <section className="bg-white mt-8 p-6 rounded-xl shadow-sm">
          <MetricsBlock title={`METRICS`} metrics={deviceData} />
        </section>
        {/* <hr className="text-gray-200 mt-10" /> */}

        {/* Opportunities */}
        <section
          className="p-2 mt-8 md:p-5"
          aria-labelledby="opportunities-title"
        >
          <h4 id="opportunities-title" className="font-bold my-4">
            Performance Improvement Opportunities
          </h4>
          <p className="text-sm mb-3">
            Below are actionable suggestions generated from your page's
            performance audit. Addressing these can significantly reduce load
            time, improve interactivity, and enhance the overall user experience
            for both desktop and mobile visitors.
          </p>

          <div className="mt-6">
            {suggestions?.length > 0 ? (
              <ul className="space-y-4">
                {suggestions.map((item, index) => {
                  const status = getOpportunityStatus(item.score);

                  return (
                    <li
                      key={index}
                      className="opportunities_li bg-gray-50 p-4 rounded shadow-sm break-words hover:shadow-md transition-all border-l-4"
                    >
                      {/* Title with color */}
                      <p
                        className={clsx(
                          "font-semibold italic",
                          getStatusColor(status, "text")
                        )}
                      >
                        {`${item.title} (${item.displayValue})`}
                      </p>
                      {/* Description */}
                      <p className="text-xs text-gray-700 mt-1">
                        {item.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-green-600 bg-green-50 border border-green-200 rounded px-4 py-3">
                No major performance suggestions — your page is doing great!
              </p>
            )}
          </div>
        </section>
        {/* <hr className="text-gray-200 my-5" /> */}

        {/* SEO, Accessibility & Best Practices */}
        <section className="p-2 mt-8 md:p-5" aria-labelledby="qa-title">
          <div className="mb-5">
            <h4 id="qa-title" className="font-bold my-4">
              Quality Assurance Scores
            </h4>
            <p className="text-sm">
              These scores reflect accessibility, best practices and search
              engine optimization. While they don't directly impact your
              performance score, they contribute to a more robust,
              user-friendly, and trustworthy website experience.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:px-4 gap-3 px-4">
            <div
              className="md:p-4 md:border-r border-gray-200 transition-transform duration-200 hover:scale-[1.02]"
              role="progressbar"
              aria-valuenow={accessibilityScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ScoreProgress accessibilityScore={accessibilityScore} />
            </div>
            <div
              className="md:p-4 md:border-r border-gray-200 transition-transform duration-200 hover:scale-[1.02]"
              role="progressbar"
              aria-valuenow={bestPracticesScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ScoreProgress bestPracticesScore={bestPracticesScore} />
            </div>
            <div
              className="md:p-4 transition-transform duration-200 hover:scale-[1.02]"
              role="progressbar"
              aria-valuenow={seoScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <ScoreProgress seoScore={seoScore} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Report;
