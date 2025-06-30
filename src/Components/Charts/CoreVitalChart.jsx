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
  benchmarkLines,
  colors,
  metricDescriptions,
} from "../../config/chartConfig";

export default function CoreVitalChart({
  title,
  description,
  quality,
  lines,
  data,
  yDomain,
  unit,
}) {
  const [visibleLines, setVisibleLines] = useState(() =>
    lines.map((line) => line.key)
  );

  const handleToggle = (key) => {
    setVisibleLines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="my-8 text-sm">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 uppercase underline mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 rounded-lg mb-6 leading-relaxed italic">
        {description} <br /> <span className="font-semibold">{quality}</span>
      </p>

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
                className="w-3 h-3 text-white dark:text-blue-950"
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
            <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
              {label} ({device})
            </span>
          </label>
        ))}
      </div>

      {/* Custom Legend */}
      <div className="flex items-center gap-4 mb-3 ml-1">
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
      <ResponsiveContainer width="100%" height={260}>
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
          <YAxis domain={yDomain} />
          <Tooltip
            formatter={(value, name) => [
              unit === "s"
                ? `${value.toFixed(2)}s`
                : unit === "ms"
                ? `${value}ms`
                : value,
              metricDescriptions[name] || name,
            ]}
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
                    value:
                      unit === "s"
                        ? `Benchmark: ${benchmarkLines[key]}s`
                        : unit === "ms"
                        ? `Benchmark: ${benchmarkLines[key]}ms`
                        : `Benchmark: ${benchmarkLines[key]}`,
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
