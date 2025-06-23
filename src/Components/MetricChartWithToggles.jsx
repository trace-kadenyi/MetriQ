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
    <div className="my-10 text-sm">
      <h3 className="font-semibold text-gray-800 mb-4 underline uppercase">
        {title}
      </h3>

      {/* Toggle Checkboxes */}
      <div className="flex flex-wrap gap-4 mb-4">
        {lines.map(({ key, label, device }) => (
          <label key={key} className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={visibleLines.includes(key)}
              onChange={() => handleToggle(key)}
              className="accent-orange-500"
            />
            <span
              title={metricDescriptions[key]}
              className="text-gray-700 cursor-help font-semibold"
            >
              {label} ({device})
            </span>
          </label>
        ))}
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
