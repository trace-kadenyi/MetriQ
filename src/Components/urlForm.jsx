import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useUrlForm() {
  const [url, setUrl] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [partialResults, setPartialResults] = useState(null);
  const [submittedUrl, setSubmittedUrl] = useState("");

  const navigate = useNavigate();

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
    setHasSubmitted(true);

    if (!isValidFormat) return;

    setLoading(true);

    try {
      // Step 1: Check if the URL is reachable
      let checkRes;
      try {
        checkRes = await axios.post("http://localhost:4000/api/url/check", {
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

      // Step 2: Generate the report
      let reportRes;
      try {
        reportRes = await axios.post("http://localhost:4000/api/url/report", {
          url,
        });
        setUrl("");
      } catch (reportErr) {
        toast.error(
          "Something went wrong while generating the report. Please try again."
        );
        setShowPopup(false);
        return;
      }

      if (reportRes.data.success && reportRes.data.report) {
        const report = reportRes.data.report;
        const partial = {
          mobile: {
            performance: report.scores?.mobile?.performance,
            seo: report.scores?.mobile?.seo,
            accessibility: report.scores?.mobile?.accessibility,
            bestPractices: report.scores?.mobile?.bestPractices,
          },
          desktop: {
            performance: report.scores?.desktop?.performance,
            seo: report.scores?.desktop?.seo,
            accessibility: report.scores?.desktop?.accessibility,
            bestPractices: report.scores?.desktop?.bestPractices,
          },
        };

        setPartialResults(partial); // Save partial results
      } else {
        toast.error("Ooops! Something went wrong.");
        setShowPopup(false);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      setShowPopup(false);
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
  };
}
