import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreProgress = ({ performanceScore, seoScore, accessibilityScore }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "#22c55e";
    if (score >= 50) return "#fb923c";
    return "#ef4444";
  };

  const items = [];

  if (performanceScore !== undefined)
    items.push({ title: "Performance", score: performanceScore });

  if (seoScore !== undefined) items.push({ title: "SEO", score: seoScore });

  if (accessibilityScore !== undefined)
    items.push({ title: "Accessibility", score: accessibilityScore });

  return (
    <div className="flex gap-2 items-center mt-6 flex-wrap">
      {items.map(({ title, score }) => (
        <div key={title} className="flex flex-col items-center gap-2 w-24">
          <div className="w-24 h-24">
            <CircularProgressbar
              className="circularProgress"
              value={score}
              maxValue={100}
              text={`${score}`}
              styles={buildStyles({
                textColor: getScoreColor(score),
                pathColor: getScoreColor(score),
                trailColor: "#d6d6d6",
                textSize: "30px",
              })}
            />
          </div>
          <p className="score_title text-center text-gray-700 font-semibold">
            {title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScoreProgress;
