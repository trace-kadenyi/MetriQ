import React from "react";
import PropTypes from "prop-types";
import ScoreProgress from "./ScoreProgress"; // Assuming you already have this component
// import "./RenderFetchedReport.css"; // Custom styles for the boxes

const RenderFetchedReport = ({
  fetchedReport,
  view,
  getStatusClass,
  getMetricStatus,
}) => {
  if (!fetchedReport) {
    return <p>Loading fetched report...</p>;
  }

  const {
    scores: { mobile, desktop },
    metrics: { mobile: mobileMetrics, desktop: desktopMetrics },
  } = fetchedReport;

  const deviceData = view === "mobile" ? mobileMetrics : desktopMetrics;
  const performanceScore =
    view === "mobile" ? mobile.performance : desktop.performance;
  const seoScore = view === "mobile" ? mobile.seo : desktop.seo;
  const accessibilityScore =
    view === "mobile" ? mobile.accessibility : desktop.accessibility;

  // Get text color based on status
  const getStatusTextColor = (status) => {
    switch (status) {
      case "Good":
        return { color: "#28a745" }; // Green for Good
      case "Needs Improvement":
        return { color: "#ffc107" }; // Yellow for Needs Improvement
      case "Poor":
        return { color: "#dc3545" }; // Red for Poor
      default:
        return { color: "#6c757d" }; // Neutral color for default
    }
  };

  return (
    <div className="report-container">
      <h2 className="deviceName">
        Previous {view.charAt(0).toUpperCase() + view.slice(1)} Metrics
     
      </h2>
      <ScoreProgress
        performanceScore={performanceScore}
        seoScore={seoScore}
        accessibilityScore={accessibilityScore}
      />
      <div className="metrics-container">
        {Object.entries(deviceData).map(([key, metric]) => {
          const statusTextColor = getStatusTextColor(metric.status);

          return (
            <div key={key} className="metric-box">
              <h3 className="metric-label">{key}</h3>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-status" style={statusTextColor}>
                {metric.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Prop Types Validation
RenderFetchedReport.propTypes = {
  fetchedReport: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  getStatusClass: PropTypes.func.isRequired,
  getMetricStatus: PropTypes.func.isRequired,
};

export default RenderFetchedReport;
