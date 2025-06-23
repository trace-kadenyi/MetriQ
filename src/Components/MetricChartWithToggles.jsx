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
import {
  metricDescriptions,
  benchmarkLines,
  colors,
} from "../config/chartConfig";

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
          <label
            key={key}
            className="relative flex items-center cursor-pointer"
          >
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

      {/* Group Toggle Buttons */}
      <div className="flex gap-4 mb-4 ml-1">
        <button
          onClick={() => {
            const mobileKeys = lines
              .filter((l) => l.device === "mobile")
              .map((l) => l.key);
            const allVisible = mobileKeys.every((k) =>
              visibleLines.includes(k)
            );
            setVisibleLines((prev) =>
              allVisible
                ? prev.filter((k) => !mobileKeys.includes(k))
                : [...new Set([...prev, ...mobileKeys])]
            );
          }}
          className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition"
        >
          {lines.every(
            (l) => l.device !== "mobile" || visibleLines.includes(l.key)
          )
            ? "Hide Mobile"
            : "Show Mobile"}
        </button>

        <button
          onClick={() => {
            const desktopKeys = lines
              .filter((l) => l.device === "desktop")
              .map((l) => l.key);
            const allVisible = desktopKeys.every((k) =>
              visibleLines.includes(k)
            );
            setVisibleLines((prev) =>
              allVisible
                ? prev.filter((k) => !desktopKeys.includes(k))
                : [...new Set([...prev, ...desktopKeys])]
            );
          }}
          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
        >
          {lines.every(
            (l) => l.device !== "desktop" || visibleLines.includes(l.key)
          )
            ? "Hide Desktop"
            : "Show Desktop"}
        </button>
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
                  stroke="gray"
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
