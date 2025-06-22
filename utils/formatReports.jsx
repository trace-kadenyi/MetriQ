export const formatReports = (reports) => {
  return Array.isArray(reports)
    ? reports.map((report) => {
        const formattedDate = `${new Date(
          report.createdAt
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })} at ${new Date(report.createdAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`;

        return {
          createdAt: formattedDate,
          scores: report.scores,
          metrics: report.metrics,
        };
      })
    : [];
};
