import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import InterRegular from "../../assets/fonts/Inter-Regular.ttf";
import InterBold from "../../assets/fonts/Inter-Bold.ttf";
import InterItalic from "../../assets/fonts/Inter-Italic.ttf";

import { styles, colors, formatLabel, classifyScore } from "../../utils/pdfStyles";
import { renderMarkdownLines } from "../../utils/AISummaryPDF";

// Font setup
Font.register({
  family: "Inter",
  fonts: [
    { src: InterRegular, fontWeight: "normal" },
    { src: InterBold, fontWeight: "bold" },
    { src: InterItalic, fontWeight: "normal", fontStyle: "italic" },
  ],
});

const ReportPDF = ({ url, reports, aiSummary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Performance Report</Text>
      <Text style={styles.italic}>URL: {url}</Text>
      <Text style={styles.italic}>
        Generated on: {new Date().toLocaleDateString()}
      </Text>

      <Text style={styles.introParagraph}>
        This report summarizes your latest website performance data, ranked from
        most recent to oldest. A total of five reports are included, each
        detailing key scores and performance metrics from both mobile and
        desktop Lighthouse audits.
      </Text>

      {reports.map((report, i) => (
        <View key={i} style={styles.section}>
          <Text style={styles.label}>
            Report {i + 1} - {report.createdAt}
          </Text>

          <Text style={styles.metricTitle}>PageSpeed Insights Scores</Text>

          <View style={styles.scoreBlock}>
            <Text style={styles.label}>Mobile Scores:</Text>
            {Object.entries(report.scores.mobile).map(([key, value]) => {
              const { color, label } = classifyScore(value);
              return (
                <Text key={key}>
                  {formatLabel(key)}:{" "}
                  <Text style={{ ...styles.coloredValue, color }}>
                    {value} ({label})
                  </Text>
                </Text>
              );
            })}
          </View>

          <View style={styles.scoreBlock}>
            <Text style={styles.label}>Desktop Scores:</Text>
            {Object.entries(report.scores.desktop).map(([key, value]) => {
              const { color, label } = classifyScore(value);
              return (
                <Text key={key}>
                  {formatLabel(key)}:{" "}
                  <Text style={{ ...styles.coloredValue, color }}>
                    {value} ({label})
                  </Text>
                </Text>
              );
            })}
          </View>

          <Text style={styles.metricTitle}>Core Web Vitals & Metrics</Text>

          <View style={styles.scoreBlock}>
            <Text style={styles.label}>Mobile Metrics:</Text>
            {Object.entries(report.metrics.mobile).map(([key, metric]) => {
              const statusColor =
                metric.status === "good"
                  ? colors.good
                  : metric.status === "average"
                  ? colors.average
                  : colors.poor;

              return (
                <Text key={key}>
                  {formatLabel(key)}:{" "}
                  <Text style={{ ...styles.coloredValue, color: statusColor }}>
                    {metric.value} ({metric.status})
                  </Text>
                </Text>
              );
            })}
          </View>

          <View style={styles.scoreBlock}>
            <Text style={styles.label}>Desktop Metrics:</Text>
            {Object.entries(report.metrics.desktop).map(([key, metric]) => {
              const statusColor =
                metric.status === "good"
                  ? colors.good
                  : metric.status === "average"
                  ? colors.average
                  : colors.poor;

              return (
                <Text key={key}>
                  {formatLabel(key)}:{" "}
                  <Text style={{ ...styles.coloredValue, color: statusColor }}>
                    {metric.value} ({metric.status})
                  </Text>
                </Text>
              );
            })}
          </View>
        </View>
      ))}
      {/* ai summary section */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.metricTitle}>AI-POWERED ANALYSIS</Text>
        {renderMarkdownLines(aiSummary, styles)}
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
