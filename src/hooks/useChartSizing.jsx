import { useState, useEffect } from "react";

// get sizes func
const getSizes = (w) => {
  if (w < 640) return { barSize: 6, barGap: 6, catGap: "15%", labelFont: 8 };
  if (w < 768) return { barSize: 10, barGap: 10, catGap: "22%", labelFont: 11 };
  if (w < 1024)
    return { barSize: 30, barGap: 14, catGap: "25%", labelFont: 12 };
  return { barSize: 40, barGap: 18, catGap: "30%", labelFont: 13 };
};

// use chart sizing func
export const useChartSizing = () => {
  const [sizes, setSizes] = useState(getSizes(window.innerWidth));
  useEffect(() => {
    const onResize = () => setSizes(getSizes(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return sizes;
};
