// hooks/useFetchReports.js
import axios from "axios";
import toast from "react-hot-toast";

export const useFetchReports = (
  url,
  setLoading,
  setAiSummary,
  setPrevReports,
  setUnsortedAiReports,
  setErrorOccurred
) => {
  const fetchReports = async () => {
    setLoading(true);
    setAiSummary("");

    try {
      const res = await axios.get(
        `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
      );

      if (res.data.success) {
        const sorted = res.data.report.reports.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPrevReports(sorted);
        setUnsortedAiReports(res.data.report.reports);
      } else {
        toast.error(`No reports found for ${url}`);
        setErrorOccurred(true);
      }
    } catch (err) {
      console.error("Error fetching reports: ", err);
      setErrorOccurred(true);
    } finally {
      setLoading(false);
    }
  };

  return fetchReports;
};
