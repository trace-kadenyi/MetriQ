import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreProgress = ({ performanceScore, seoScore, accessibilityScore }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "#abbd81"; // Good score
    if (score >= 50) return "#f8b26a"; // Needs Improvement
    return "#e15b64"; // Poor Score
  };
  return (
    <div className="ProgressContainer">
      {/* Performance Score */}
      <div className="score-item">
        <CircularProgressbar
          className="circularProgress"
          value={performanceScore}
          maxValue={100}
          text={`${performanceScore}`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: getScoreColor(performanceScore),
            trailColor: "#d6d6d6",
          })}
        />
        <p className="progressTitle">Performance</p>
      </div>

      {/* SEO Score */}
      <div className="score-item">
        <CircularProgressbar
          className="circularProgress"
          value={seoScore}
          maxValue={100}
          text={`${seoScore}`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: getScoreColor(seoScore),
            trailColor: "#d6d6d6",
          })}
        />
        <p className="progressTitle">SEO</p>
      </div>

      {/* Accessibility Score */}
      <div className="score-item">
        <CircularProgressbar
          className="circularProgress"
          value={accessibilityScore}
          maxValue={100}
          text={`${accessibilityScore}`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: getScoreColor(accessibilityScore),
            trailColor: "#d6d6d6",
          })}
        />
        <p className="progressTitle">Accessibility</p>
      </div>
    </div>
  );
};

export default ScoreProgress;
