import clsx from "clsx";
import { useNavigate } from "react-router-dom";

// color combinations
const textClassMap = {
  good: "text-green-500",
  average: "text-orange-400",
  poor: "text-red-500",
  default: "text-gray-400",
};

const bgClassMap = {
  good: "bg-green-500",
  average: "bg-orange-400",
  poor: "bg-red-500",
  default: "bg-gray-400",
};

const hexMap = {
  good: "#22c55e",
  average: "#fb923c",
  poor: "#ef4444",
  default: "#6c757d",
};

// get status color
export const getStatusColor = (status, type = "style") => {
  const safeStatus = ["good", "average", "poor"].includes(status)
    ? status
    : "default";

  if (type === "style") return { backgroundColor: hexMap[safeStatus] };
  if (type === "bg") return bgClassMap[safeStatus];
  if (type === "text") return textClassMap[safeStatus];
  return "";
};

// handle scores
export const ScoreBlock = ({ title, scores }) => (
  <section className="py-3">
    <h3 className="font-bold">{title}</h3>
    {Object.entries(scores).map(([key, value]) => (
      <p key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
      </p>
    ))}
  </section>
);

// handle metrics
export const MetricsBlock = ({ title, metrics }) => (
  <section className="py-3 text-sm">
    <h3 className="font-semibold my-2 mb-4 lg:text-center dark:text-gray-100">
      {title}
    </h3>
    <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5 lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:items-center">
      {Object.entries(metrics).map(([key, metric]) => (
        <p key={key} className="flex gap-2 items-center dark:text-gray-200">
          <span
            className="inline-block w-3 h-3 rounded-full ml-1"
            style={getStatusColor(metric.status, "style")}
          />
          <span>
            {key}:{"   "}
            <span
              className={clsx(
                "font-semibold",
                getStatusColor(metric.status, "text")
              )}
            >
              {metric.value}
            </span>
          </span>
        </p>
      ))}
    </div>
  </section>
);

// render core web vitals
export const renderVital = (label, key, getStatusColor, deviceData) => (
  <p className="text-sm flex gap-1 items-center flex-row md:flex-col pr-3">
    <span className="flex gap-1 items-center">
      <span
        className="inline-block w-3 h-3 rounded-full ml-1"
        style={getStatusColor(deviceData[key].status, "style")}
      />
      <span className="after:content-[':_'] md:after:content-none">
        {label}
      </span>
    </span>
    <span>{deviceData[key].value}</span>
  </p>
);

// render device score colours
export const scoreColour = (score) => {
  if (score >= 90) return "text-green-500";
  if (score >= 50) return "text-orange-400";
  return "text-red-500";
};

export const borderColour = (score) => {
  if (score >= 90) return "border-green-500";
  if (score >= 50) return "border-orange-400";
  return "border-red-500";
};

export const getScoreStatus = (score) => {
  if (score == null) return "default";
  if (score >= 90) return "good";
  if (score >= 50) return "average";
  return "poor";
};

// opportunity status
export const getOpportunityStatus = (score) => {
  if (score >= 0.9) return "good";
  if (score >= 0.5) return "average";
  return "poor";
};

// Error template
export const ErrorTemp = ({ url, errorGif }) => {
  const navigate = useNavigate();

  return (
    <section className="p-6 md:mt-20 flex justify-center items-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <img src={errorGif} alt="No data found" className="w-32 h-32 mx-auto" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">
          No reports found for this URL
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          We couldn’t find any past reports for:
          <span className="block mt-1 text-gray-500 dark:text-gray-400 italic break-words">
            {url}
          </span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

// preloader template
export const Loader = ({ src, alt = "Loading...", fullScreen = true }) => (
  <div
    className={`preloader_div flex justify-center items-center ${
      fullScreen ? "h-screen" : "h-full"
    } bg-gray-50`}
  >
    <img src={src} alt={alt} />
  </div>
);
