import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScoreBlock, MetricsBlock } from "../Components/ResultsBlock";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
        );
        if (res.data.success) {
          setReport(res.data.report);
        } else {
          alert("No report found for this URL.");
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        alert("Could not load the report.");
      }
    };

    if (url) fetchReport();
  }, [url]);

  if (!report) return <p>Loading...</p>;

  return (
    <div>
      <h2>Report for {report.url}</h2>
      {/* scores */}
      <ScoreBlock title="Mobile Scores" scores={report.scores.mobile} />
      <ScoreBlock title="Desktop Scores" scores={report.scores.desktop} />
      {/* metrics */}
      <MetricsBlock title="Mobile Metrics" metrics={report.metrics.mobile} />
      <MetricsBlock title="Desktop Metrics" metrics={report.metrics.desktop} />
    </div>
  );
};

export default ResultsPage;
