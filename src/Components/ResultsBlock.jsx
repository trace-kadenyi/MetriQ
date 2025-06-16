import clsx from "clsx";

// scores
export const ScoreBlock = ({ title, scores }) => (
  <section className="py-3">
    <h3 className="font-bold">{title}</h3>
    {Object.entries(scores).map(([key, value]) => (
      <p key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
      </p>
    ))}
  </section>
);

// metrics
export const MetricsBlock = ({ title, metrics }) => (
  <section className="py-3">
    <h3 className="font-bold">{title}</h3>
    {Object.entries(metrics).map(([key, metric]) => (
      <p key={key} className="flex gap-2 items-center">
        <span
          className={clsx("inline-block w-3 h-3 rounded-full ml-1", {
            "bg-red-500": metric.status === "poor",
            "bg-orange-400": metric.status === "average",
            "bg-green-500": metric.status === "good",
          })}
        />
        <span>
          {key}: {metric.value}{" "}
        </span>
      </p>
    ))}
  </section>
);

// Get text color based on status
export const getStatusTextColor = (status) => {
  switch (status) {
    case "good":
      return { backgroundColor: "#22c55e" }; // Green for Good
    case "Needs Improvement":
      return { backgroundColor: "#fb923c" }; // Yellow for Needs Improvement
    case "poor":
      return { backgroundColor: "#ef4444" }; // Red for Poor
    default:
      return { backgroundColor: "#6c757d" }; // Neutral color for default
  }
};
