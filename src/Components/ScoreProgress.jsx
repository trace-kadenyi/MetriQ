import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreProgress = ({ performanceScore, seoScore, accessibilityScore }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "#abbd81";
    if (score >= 50) return "#f8b26a";
    return "#e15b64";
  };

  const items = [
    { title: "Performance", score: performanceScore },
    { title: "SEO", score: seoScore },
    { title: "Accessibility", score: accessibilityScore },
  ];

  return (
    <div className="flex gap-2 justify-center items-center mt-6 flex-wrap">
      {items.map(({ title, score }) => (
        <div key={title} className="flex flex-col items-center gap-2 w-24">
          <div className="w-24 h-24">
            <CircularProgressbar
              className="circularProgress"
              value={score}
              maxValue={100}
              text={`${score}`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: getScoreColor(score),
                trailColor: "#d6d6d6",
              })}
            />
          </div>
          <p className="text-sm font-medium text-center text-gray-700">
            {title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScoreProgress;
