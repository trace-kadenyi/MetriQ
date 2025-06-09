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

export const MetricsBlock = ({ title, metrics }) => (
  <section className="py-3">
    <h3 className="font-bold">{title}</h3>
    {Object.entries(metrics).map(([key, metric]) => (
      <p key={key}>
        {key}: {metric.value}{" "}
        <span
          style={{
            color:
              metric.status === "poor"
                ? "red"
                : metric.status === "average"
                ? "orange"
                : "green",
          }}
        >
          ({metric.status})
        </span>
      </p>
    ))}
  </section>
);
