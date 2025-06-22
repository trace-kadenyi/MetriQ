import axios from "axios";
import toast from "react-hot-toast";

export const useFetchCurrReport = (url, setReport, setLatestReport) => {
  const fetchReport = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
      );
      if (res.data.success) {
        setReport(res.data.report);
        setLatestReport(res.data.report.reports?.at(-1));
      } else {
        toast.error("No report found for this URL.");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      toast.error("An unexepected error occurred. Plesae try again later.");
    }
  };

  return fetchReport;
};
