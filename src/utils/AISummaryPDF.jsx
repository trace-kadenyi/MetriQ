import { Text } from "@react-pdf/renderer";

// render markdown lines func
export const renderMarkdownLines = (summary, styles) => {
  const fallback = `
No AI Analysis was generated for these reports.

To include AI-generated insights, please return to the reports page, click “Generate AI Analysis,” and then download the PDF again.
`;

  const source =
    typeof summary === "string" && summary.trim() !== ""
      ? summary
          .replace(/--+/g, "") // remove -- or longer
          .replace(/[^\x20-\x7E\r\n]+/g, "") // remove non-printable chars like "2"
          .replace(/[★⭐]+/g, "") // remove stars
      : fallback;

  const lines = source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  return lines.map((line, idx) => {
    const plainText = line
      .replace(/^#+\s*/, "")
      .replace(/^\*+\s*/, "")
      .replace(/^\•\s*/, "")
      .replace(/^\-\s*/, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

    if (!plainText) {
      return <Text key={idx}> </Text>; // prevent invalid child error
    }

    if (/^\d+\.\s+/.test(line)) {
      return (
        <Text key={idx} style={styles.listItem}>
          {plainText}
        </Text>
      );
    }

    if (/^[-•]\s+/.test(line)) {
      return (
        <Text key={idx} style={styles.listItem}>
          • {plainText}
        </Text>
      );
    }

    if (line.startsWith("###")) {
      return (
        <Text key={idx} style={[styles.metricTitle, { marginTop: 12 }]}>
          {plainText}
        </Text>
      );
    }

    return (
      <Text key={idx} style={styles.introParagraph}>
        {plainText}
      </Text>
    );
  });
};
