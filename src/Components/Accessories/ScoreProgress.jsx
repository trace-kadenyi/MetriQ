import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import clsx from "clsx";

const ScoreProgress = ({
  performanceScore,
  seoScore,
  accessibilityScore,
  bestPracticesScore,
  showDescriptions = true,
  progressWrapperClassName = "",
  wrapperAlign = "md:items-center",
}) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "#22c55e";
    if (score >= 50) return "#fb923c";
    return "#ef4444";
  };

  const items = [];

  if (performanceScore !== undefined)
    items.push({ title: "Performance", score: performanceScore });

  if (seoScore !== undefined)
    items.push({
      title: "SEO",
      score: seoScore,
      description:
        "Evaluates how well your site adheres to essential search engine optimization guidelines, enhancing visibility and discoverability.",
    });

  if (accessibilityScore !== undefined)
    items.push({
      title: "Accessibility",
      score: accessibilityScore,
      description:
        "Assesses your site's compliance with accessibility standards to ensure it is usable by individuals of all abilities.",
    });

  if (bestPracticesScore !== undefined)
    items.push({
      title: "Best Practices",
      score: bestPracticesScore,
      description:
        "Examines critical aspects of site integrity, including security, performance, and adherence to modern web development standards.",
    });

  return (
    <div className="flex gap-2 mt-6 flex-wrap">
      {items.map(({ title, score, description }) => (
        <div
          key={title}
          className={clsx("flex flex-col gap-2 lg:w-1/2 mx-auto", wrapperAlign)}
        >
          <div
            className={clsx(
              !progressWrapperClassName && "w-18 h-18 sm:w-24 sm:h-24",
              progressWrapperClassName
            )}
          >
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
          <div>
            <p className="score_title md:text-center text-gray-700 font-semibold dark:text-gray-100">
              {title}
            </p>
            {showDescriptions && description && (
              <p className="scores_desc text-gray-700 dark:text-gray-300 md:text-center">
                {description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreProgress;
