import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import InterRegular from "../../assets/fonts/Inter-Regular.ttf";
import InterBold from "../../assets/fonts/Inter-Bold.ttf";
import InterItalic from "../../assets/fonts/Inter-Italic.ttf";
import {
  styles,
  classifyScore,
  colors,
  formatLabel,
} from "../../utils/pdfStyles";
import { renderMarkdownLines } from "../../utils/AISummaryPDF";

/* -----------------------------------------------------------
   Register Inter font (regular / bold / italic)
   ----------------------------------------------------------- */
Font.register({
  family: "Inter",
  fonts: [
    { src: InterRegular },
    { src: InterBold, fontWeight: 700 },
    { src: InterItalic, fontStyle: "italic" },
  ],
});

/* -----------------------------------------------------------
   Helper function to render one score block (mobile / desktop)
   ----------------------------------------------------------- */
const ScoreBlock = ({ label, scores }) => (
  <View style={styles.scoreBlock}>
    <Text style={styles.label}>{label}:</Text>
    {Object.entries(scores).map(([k, v]) => {
      const { color, label } = classifyScore(v);
      return (
        <Text key={k}>
          {formatLabel(k)}:{" "}
          <Text style={{ ...styles.coloredValue, color }}>
            {v} ({label})
          </Text>
        </Text>
      );
    })}
  </View>
);

/* -----------------------------------------------------------
   PDF component
   ----------------------------------------------------------- */
const CompetitorComparisonPDF = ({ comparison, aiAnalysis }) => {
  const { userSiteUrl, userScores, competitors } = comparison;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header */}
        <Text style={styles.title}>Competitor Comparison Report</Text>
        <Text style={styles.italic}>
          <Text>Your site: </Text>
          <Text>{userSiteUrl}</Text>
        </Text>
        <Text style={styles.italic}>
          <Text>Generated on: </Text>
          <Text>{new Date().toLocaleDateString()}</Text>
        </Text>

        <Text style={styles.introParagraph}>
          This report compares your Lighthouse performance scores to those of
          selected competitors. It includes both mobile and desktop results
          together with an AI‑powered analysis.
        </Text>

        {/* -------- Your site -------- */}
        <View style={styles.section}>
          <Text style={styles.metricTitle}>Your Lighthouse Scores</Text>
          <ScoreBlock label="Mobile" scores={userScores.mobile} />
          <ScoreBlock label="Desktop" scores={userScores.desktop} />
        </View>

        {/* -------- Competitors -------- */}
        <Text style={styles.metricTitle}>Competitor Scores</Text>
        {competitors.map((c, i) =>
          c.scores ? (
            <View key={i} style={styles.section}>
              <Text style={styles.label}>
                {i + 1}. {c.label || c.url}
              </Text>
              <ScoreBlock label="Mobile" scores={c.scores.mobile} />
              <ScoreBlock label="Desktop" scores={c.scores.desktop} />
            </View>
          ) : (
            <View key={i} style={styles.section}>
              <Text style={{ ...styles.label, color: colors.poor }}>
                <Text>{c.label || c.url}: Data not available</Text>
              </Text>
            </View>
          )
        )}

        {/* -------- AI analysis -------- */}
        {aiAnalysis && aiAnalysis.trim().length > 0 ? (
          <View style={{ marginTop: 30 }}>
            <Text style={styles.metricTitle}>AI‑POWERED ANALYSIS</Text>
            {renderMarkdownLines(aiAnalysis, styles)}
          </View>
        ) : (
          <View style={{ marginTop: 30 }}>
            <Text style={styles.metricTitle}>AI‑POWERED ANALYSIS</Text>
            <Text style={styles.paragraph}>
              No AI Analysis was generated for this comparison.
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CompetitorComparisonPDF;
