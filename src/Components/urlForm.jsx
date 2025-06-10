import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useUrlForm() {
  const [url, setUrl] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
        alert("URL could not be reached. Please check the address.");
        return;
      }

      if (!checkRes.data.success) {
        alert("URL is not reachable or invalid.");
        return;
      }

      // Step 2: Generate the report
      let reportRes;
      try {
        reportRes = await axios.post("http://localhost:4000/api/url/report", {
          url,
        });
      } catch (reportErr) {
        alert("Something went wrong while generating the report.");
        return;
      }

      if (reportRes.data.success && reportRes.data.report) {
        const savedUrl = reportRes.data.report.url;
        navigate(`/results-page?url=${encodeURIComponent(savedUrl)}`);
      } else {
        alert("Something went wrong. Report could not be saved.");
      }
    } catch (err) {
      alert("An unexpected error occurred. Please try again.");
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
  };
}
