import React from "react";
import { jsPDF } from "jspdf";

// generate PDF file for downloading the report
const PDFGenerator = ({
  url,
  view,
  mobileData,
  desktopData,
  mobilePerformanceScore,
  desktopPerformanceScore,
  mobileSeoScore,
  desktopSeoScore,
  mobileAccessibilityScore,
  desktopAccessibilityScore,
  getMetricValue,
  getMetricStatus,
}) => {
  const doc = new jsPDF();
  doc.setFont("helvetica");

  // Add Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold"); // Set font to bold
  doc.text(
    `${
      view.charAt(0).toUpperCase() + view.slice(1)
    }: PageSpeed Insights Report`,
    20,
    20
  );

  // Draw the underline
  const textWidth = doc.getTextWidth(
    `${view.charAt(0).toUpperCase() + view.slice(1)}: PageSpeed Insights Report`
  );
  const underlineYTitle = 22; // Position for the underline (just below the text)
  doc.line(20, underlineYTitle, 20 + textWidth, underlineYTitle); // Draw the underline

  // Add Device Data
  const deviceData = view === "mobile" ? mobileData : desktopData;
  const performanceScore =
    view === "mobile" ? mobilePerformanceScore : desktopPerformanceScore;
  const seoScore = view === "mobile" ? mobileSeoScore : desktopSeoScore;
  const accessibilityScore =
    view === "mobile" ? mobileAccessibilityScore : desktopAccessibilityScore;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text(`Performance Score: ${performanceScore}`, 20, 30);
  doc.text(`SEO Score: ${seoScore}`, 20, 40);
  doc.text(`Accessibility Score: ${accessibilityScore}`, 20, 50);

  // Reset font to regular (non-bold) for the rest of the text
  doc.setFont("helvetica", "normal");

  // Add overline before LCP
  const lcpOverlineY = 60; // Position for the overline (above LCP)
  doc.line(20, lcpOverlineY, 180, lcpOverlineY); // Draw the overline (adjust length as needed)

  // Include specific metrics like FCP, LCP, etc.
  doc.text(
    `Largest Contentful Paint (LCP): ${getMetricValue(
      deviceData["largest-contentful-paint"]
    )} (${getMetricStatus(deviceData["largest-contentful-paint"], "LCP")})`,
    20,
    65
  );
  doc.text(
    `First Input Delay (FID): ${getMetricValue(
      deviceData["max-potential-fid"]
    )} (${getMetricStatus(deviceData["max-potential-fid"], "FID")})`,
    20,
    75
  );
  doc.text(
    `First Contentful Paint (FCP): ${getMetricValue(
      deviceData["first-contentful-paint"]
    )} (${getMetricStatus(deviceData["first-contentful-paint"], "FCP")})`,
    20,
    85
  );
  doc.text(
    `Cumulative Layout Shift (CLS): ${getMetricValue(
      deviceData["cumulative-layout-shift"]
    )} (${getMetricStatus(deviceData["cumulative-layout-shift"], "CLS")})`,
    20,
    95
  );
  doc.text(
    `Speed Index: ${getMetricValue(
      deviceData["speed-index"]
    )} (${getMetricStatus(deviceData["speed-index"], "Speed Index")})`,
    20,
    105
  );
  doc.text(
    `Total Blocking Time: ${getMetricValue(
      deviceData["total-blocking-time"]
    )} (${getMetricStatus(deviceData["total-blocking-time"], "TBT")})`,
    20,
    115
  );

  // Save the PDF
  doc.save(`${url}_PageSpeed_Report.pdf`);
};

export default PDFGenerator;
