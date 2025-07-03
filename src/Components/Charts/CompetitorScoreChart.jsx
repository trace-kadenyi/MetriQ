import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

import { useChartSizing } from "../../hooks/useChartSizing";

const metricColors = {
  performance: "#10B981", // green
  seo: "#F59E0B", // orange
  bestPractices: "#3B82F6", // blue
  accessibility: "#8B5CF6", // purple
};

const getChartData = (comparison, metric) => {
  if (!comparison) return [];

  const data = [];

  const addRow = (label, scores) => {
    if (!scores) return;
    data.push({
      name: label,
      mobile: scores.mobile?.[metric] ?? null,
      desktop: scores.desktop?.[metric] ?? null,
    });
  };

  addRow("Your Site", comparison.userScores);

  comparison.competitors.forEach((comp, i) => {
    addRow(comp.label || `Competitor ${i + 1}`, comp.scores);
  });

  return data;
};

export const CompetitorScoreChart = ({ comparison, metric }) => {
  const data = getChartData(comparison, metric);

  const { barSize, barGap, catGap, labelFont } = useChartSizing();

  const barColors = {
    mobile: "#F97316", // orange-500
    desktop: "#10B981", // green-500
  };

  const renderLabel = ({ x, y, value }) => (
    <text
      x={x}
      y={y - 4}
      textAnchor="middle"
      fontSize={labelFont}
      fill="#374151"
    >
      {value}
    </text>
  );
  return (
    <div className="my-10">
      <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-100 capitalize underline">
        {metric} scores – mobile vs desktop
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap={catGap}
          barGap={barGap}
          margin={{ top: 30, right: 20, left: 20, bottom: 5 }} // ← add this
        >
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "0.8rem" }} />

          <Bar
            dataKey="mobile"
            fill={barColors.mobile}
            name="Mobile"
            barSize={barSize}
          >
            <LabelList
              dataKey="mobile"
              position="top"
              offset={4}
              content={renderLabel}
            />{" "}
            {/* optional offset */}
          </Bar>
          <Bar
            dataKey="desktop"
            fill={barColors.desktop}
            name="Desktop"
            barSize={barSize}
          >
            <LabelList
              dataKey="desktop"
              position="top"
              offset={4}
              content={renderLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
