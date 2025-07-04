import { useRef, useState } from "react";
import toast from "react-hot-toast";

import api from "../api";

export default function useUrlForm() {
  const [url, setUrl] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [partialResults, setPartialResults] = useState(null);
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [showLongWaitMessage, setShowLongWaitMessage] = useState(false);

  let timeoutId = useRef(null);

  // validate url
  const validateUrlFormat = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };
  // handle change
  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValidFormat(validateUrlFormat(value));
    setHasSubmitted(false);
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPartialResults(null);
    setSubmittedUrl("");
    setHasSubmitted(true);
    setShowLongWaitMessage(false);
    clearTimeout(timeoutId.current);

    if (!isValidFormat) return;

    setLoading(true);

    try {
      // Step 1: Check if the URL is reachable
      let checkRes;
      try {
        checkRes = await api.post("/api/url/check", {
          url,
        });
      } catch (checkErr) {
        toast.error("URL could not be reached. Please check the address.");
        return;
      }

      if (!checkRes.data.success) {
        toast.error("URL is not reachable or invalid.");
        return;
      }

      setSubmittedUrl(url.trim());
      setShowPopup(true);

      // START timeout for 20s message
      timeoutId.current = setTimeout(() => {
        setShowLongWaitMessage(true);
      }, 30000);

      // Step 2: Generate the report
      let reportRes;
      try {
        reportRes = await api.post("/api/url/report", {
          url,
        });
        setUrl("");
      } catch (reportErr) {
        toast.error(
          "Something went wrong while generating the report. Please try again."
        );
        setShowPopup(false);
        clearTimeout(timeoutId.current);
        return;
      }

      if (reportRes.data.success && reportRes.data.report) {
        const report = reportRes.data.report;
        const latestReport = report.reports?.at(-1);
        const partial = {
          mobile: {
            performance: latestReport?.scores?.mobile?.performance,
            seo: latestReport?.scores?.mobile?.seo,
            accessibility: latestReport?.scores?.mobile?.accessibility,
            bestPractices: latestReport?.scores?.mobile?.bestPractices,
          },
          desktop: {
            performance: latestReport?.scores?.desktop?.performance,
            seo: latestReport?.scores?.desktop?.seo,
            accessibility: latestReport?.scores?.desktop?.accessibility,
            bestPractices: latestReport?.scores?.desktop?.bestPractices,
          },
        };

        setPartialResults(partial); // Save partial results
      } else {
        toast.error("Ooops! Something went wrong.");
        setShowPopup(false);
        clearTimeout(timeoutId.current);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      setShowPopup(false);
      clearTimeout(timeoutId.current);
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    isValidFormat,
    hasSubmitted,
    handleChange,
    handleSubmit,
    loading,
    setLoading,
    showPopup,
    setShowPopup,
    partialResults,
    submittedUrl,
    showLongWaitMessage,
  };
}
