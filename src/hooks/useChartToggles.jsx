import { useState, useMemo } from "react";
import { Line, ReferenceLine } from "recharts";
import {
  colors,
  scorePoorThresholds,
  benchmarkLines,
  metricDescriptions,
} from "../config/chartConfig";

export function useChartToggles(lines, unit = null) {
  const [visibleLines, setVisibleLines] = useState(() =>
    lines.map((line) => line.key)
  );

  //   handle toggle func
  const handleToggle = (key) => {
    setVisibleLines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  //   visible chart lines func
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

  //   threshold lines func
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

  //   benchmark reference lines func
  const benchmarkReferenceLines = useMemo(
    () =>
      lines
        .filter(
          ({ key }) =>
            visibleLines.includes(key) && benchmarkLines[key] !== undefined
        )
        .map(({ key }) => (
          <ReferenceLine
            key={`benchmark-${key}`}
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
        )),
    [lines, visibleLines, unit]
  );

  //   tooltip formatter func
  const tooltipFormatter = useMemo(() => {
    return (value, name) => {
      const line = lines.find((l) => l.key === name);
      const label = line?.label || metricDescriptions[name] || name;
      const formattedValue =
        unit === "s"
          ? `${value.toFixed(2)}s`
          : unit === "ms"
          ? `${value}ms`
          : value;
      return [formattedValue, label];
    };
  }, [lines, unit]);

  return {
    visibleLines,
    setVisibleLines,
    handleToggle,
    visibleChartLines,
    thresholdLines,
    benchmarkReferenceLines,
    tooltipFormatter,
  };
}
