import { useState, useMemo } from "react";
import { Line } from "recharts";
import { colors } from "../config/chartConfig";

// 👇 Reusable hook for toggling and rendering chart lines
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

  return {
    visibleLines,
    handleToggle,
    visibleChartLines,
    setVisibleLines, // optional if you want to group-toggle
  };
}
