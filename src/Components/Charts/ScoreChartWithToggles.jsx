import { useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import {
  metricDescriptions,
  colors,
  scorePoorThresholds,
  formatDate,
  getLabel,
} from "../../config/chartConfig";
import { useChartToggles } from "../../hooks/useChartToggles";
// import { useChartToggles } from "../../hooks/useChartToggles";

export default function ScoreChartWithToggles({ title, quality, lines, data }) {
  const { visibleLines, handleToggle, visibleChartLines, thresholdLines } =
    useChartToggles(lines);

  return (
    <div className="my-6 text-sm">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 uppercase underline mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 rounded-lg mb-6 leading-relaxed italic">
        <span className="font-semibold">{quality}</span>
      </p>
      {/* Toggle Checkboxes */}
      <div className="flex flex-wrap gap-4 mb-4">
        {lines.map(({ key, label, device }) => (
          <label key={key} className="flex items-center cursor-pointer">
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
          className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition cursor-pointer"
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
          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition cursor-pointer"
        >
          {lines.every(
            (l) => l.device !== "desktop" || visibleLines.includes(l.key)
          )
            ? "Hide Desktop"
            : "Show Desktop"}
        </button>
      </div>

      {/* chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" tickFormatter={formatDate} />

          <YAxis domain={[0, 100]} />

          <Tooltip
            formatter={(value, name) => [value, getLabel(name, lines)]}
            contentStyle={{ fontSize: "0.8rem" }}
          />

          {/* Chart lines */}
          {visibleChartLines}

          {/* Poor threshold marker */}
          {thresholdLines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
