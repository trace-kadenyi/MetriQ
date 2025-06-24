import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  good: "#22c55e",
  average: "#fb923c",
  poor: "#ef4444",
  title: "#1f2937",
};

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Inter",
    color: colors.title,
  },
  section: {
    marginBottom: 20,
    borderBottom: "1 solid #ccc",
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 700,
    color: colors.title,
  },
  label: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: 600,
    color: colors.title,
  },
  scoreBlock: {
    marginTop: 4,
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 600,
    textDecoration: "underline",
    color: colors.title,
  },
  introParagraph: {
    fontSize: 11,
    marginVertical: 6,
    lineHeight: 1.4,
    color: "#374151",
  },
  listItem: {
    fontSize: 11,
    marginVertical: 2,
    paddingLeft: 10,
    lineHeight: 1.4,
    color: "#374151",
  },
  boldText: {
    fontWeight: 700,
  },
  italic: {
    fontStyle: "italic",
    marginTop: 3,
    fontFamily: "Inter",
  },
});

export const formatLabel = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (c) => c.toUpperCase());
};

export const classifyScore = (score) => {
  if (score >= 90) return { color: colors.good, label: "Good" };
  if (score >= 50) return { color: colors.average, label: "Average" };
  return { color: colors.poor, label: "Poor" };
};
