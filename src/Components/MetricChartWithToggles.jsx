import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useState } from "react";

const metricDescriptions = {
  mobilePerformance: "Mobile performance score (0–100)",
  desktopPerformance: "Desktop performance score (0–100)",
  mobileSEO: "Mobile SEO score",
  desktopSEO: "Desktop SEO score",
  mobileAccessibility: "Mobile accessibility score",
  desktopAccessibility: "Desktop accessibility score",
  mobileBP: "Mobile best practices score",
  desktopBP: "Desktop best practices score",
  mobileLCP: "Largest Contentful Paint on mobile (ideal < 2.5s)",
  desktopLCP: "Largest Contentful Paint on desktop (ideal < 2.5s)",
  mobileFID: "First Input Delay on mobile (ideal < 100ms)",
  desktopFID: "First Input Delay on desktop (ideal < 100ms)",
  mobileCLS: "Cumulative Layout Shift on mobile (ideal < 0.1)",
  desktopCLS: "Cumulative Layout Shift on desktop (ideal < 0.1)",
};

const benchmarkLines = {
  mobileLCP: 2.5,
  desktopLCP: 2.5,
  mobileFID: 100,
  desktopFID: 100,
  mobileCLS: 0.1,
  desktopCLS: 0.1,
};

const colors = {
  mobile: "#fb923c", // orange
  desktop: "#22c55e", // green
};

export default function MetricChartWithToggles({ title, lines, data }) {
  const [visibleLines, setVisibleLines] = useState(() =>
    lines.map((line) => line.key)
  );

  const handleToggle = (key) => {
    setVisibleLines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="my-6 text-sm">
      <h3 className="font-semibold text-gray-800 underline uppercase hidden">
        {title}
      </h3>

      {/* Toggle Checkboxes */}
      <div className="flex flex-wrap gap-4 mb-4">
        {lines.map(({ key, label, device }) => (
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={visibleLines.includes(key)}
              onChange={() => handleToggle(key)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded-sm border-2 border-orange-500 peer-checked:bg-orange-500 peer-checked:flex peer-checked:items-center peer-checked:justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="ml-2 text-gray-700 text-sm font-medium">
              {label} ({device})
            </span>
          </label>
        ))}
      </div>
      {/* Custom Legend */}
      <div className="flex items-center gap-4 mb-2 ml-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#fb923c] inline-block" />
          <span className="text-sm text-orange-400 font-medium">Mobile</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#22c55e] inline-block" />
          <span className="text-sm text-green-500 font-medium">Desktop</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              date instanceof Date
                ? date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : ""
            }
          />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              value,
              metricDescriptions[name] ||
                lines.find((l) => l.key === name)?.label ||
                name,
            ]}
            labelClassName="text-xs"
            contentStyle={{ fontSize: "0.8rem" }}
          />

          {lines.map(
            ({ key, label, device }) =>
              visibleLines.includes(key) && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={`${label} (${device})`}
                  stroke={colors[device]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              )
          )}
          {lines.map(
            ({ key }) =>
              visibleLines.includes(key) &&
              benchmarkLines[key] !== undefined && (
                <ReferenceLine
                  key={`ref-${key}`}
                  y={benchmarkLines[key]}
                  stroke="red"
                  strokeDasharray="4"
                  label={{
                    position: "right",
                    value: `Benchmark: ${benchmarkLines[key]}`,
                    fill: "#dc2626",
                    fontSize: 10,
                  }}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
// safe date
export const safeDate = (rawDate) => {
  if (!rawDate || typeof rawDate !== "string") return null;

  // Split date and time at ' at '
  const [datePart, timePart] = rawDate.split(" at");
  if (!datePart || !timePart) return null;

  const cleaned = `${datePart.trim()} ${timePart.trim()}`;
  const parsed = new Date(cleaned);
  return isNaN(parsed.getTime()) ? null : parsed;
};

// parse metric
export const parseMetric = (val) => {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const num = parseFloat(val.replace(/[^\d.]/g, ""));
    return isNaN(num) ? null : num;
  }
  return null;
};
