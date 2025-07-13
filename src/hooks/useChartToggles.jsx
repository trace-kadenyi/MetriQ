import { useState, useMemo } from "react";
import { Line, ReferenceLine } from "recharts";
import { colors, scorePoorThresholds } from "../config/chartConfig";

export function useChartToggles(lines) {
  const [visibleLines, setVisibleLines] = useState(() =>
    lines.map((line) => line.key)
  );

  const handleToggle = (key) => {
    setVisibleLines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const visibleChartLines = useMemo(
    () =>
      lines
        .filter(({ key }) => visibleLines.includes(key))
        .map(({ key, label, device }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={`${label} (${device})`}
            stroke={colors[device]}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        )),
    [lines, visibleLines]
  );

  const thresholdLines = useMemo(
    () =>
      lines
        .filter(({ key }) => visibleLines.includes(key))
        .map(({ key }) => {
          const y = scorePoorThresholds[key];
          if (y === undefined) return null;
          return (
            <ReferenceLine
              key={`threshold-${key}`}
              y={y}
              stroke="#dc2626"
              strokeDasharray="4 4"
              label={{
                position: "right",
                value: `⚠ Threshold: ${y}`,
                fill: "#dc2626",
                fontSize: 10,
              }}
            />
          );
        })
        .filter(Boolean),
    [lines, visibleLines]
  );

  return {
    visibleLines,
    setVisibleLines,
    handleToggle,
    visibleChartLines,
    thresholdLines,
  };
}
