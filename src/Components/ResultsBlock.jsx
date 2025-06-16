import clsx from "clsx";

// color combinations
export const getStatusColor = (status, type = "style") => {
  const colors = {
    good: { hex: "#22c55e", class: "green-500" },
    average: { hex: "#fb923c", class: "orange-400" },
    poor: { hex: "#ef4444", class: "red-500" },
    default: { hex: "#6c757d", class: "gray-400" },
  };

  const selected = colors[status] || colors.default;

  if (type === "style") return { backgroundColor: selected.hex };
  if (type === "bg") return `bg-${selected.class}`;
  if (type === "text") return `text-${selected.class}`;
  return "";
};

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
    <h3 className="font-bold my-2">{title}</h3>
    {Object.entries(metrics).map(([key, metric]) => (
      <p key={key} className="flex gap-2 items-center">
        <span
          className={clsx(
            "inline-block w-3 h-3 rounded-full ml-1",
            getStatusColor(metric.status, "bg")
          )}
        />
        <span>
          {key}: {metric.value}
        </span>
      </p>
    ))}
  </section>
);
