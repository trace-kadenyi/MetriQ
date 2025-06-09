// components/UrlForm.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useUrlForm() {
  const [url, setUrl] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateUrlFormat = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValidFormat(validateUrlFormat(value));
    setHasSubmitted(false);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setHasSubmitted(true);

  //   if (!isValidFormat) return;

  //   setLoading(true);

  //   try {
  //     const res = await axios.post("http://localhost:4000/api/url/check", {
  //       url,
  //     });

  //     if (res.data.success) {
  //       console.log("Made it to the final state of this form");
  //       setUrl("");
  //       navigate("/results-page");
  //     } else {
  //       alert("URL could not be reached. Please check the address.");
  //     }
  //   } catch (err) {
  //     alert("URL could not be reached. Please check the address.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setHasSubmitted(true);

  //   if (!isValidFormat) return;

  //   setLoading(true);

  //   try {
  //     const res = await axios.post("http://localhost:4000/api/url/check", {
  //       url,
  //     });

  //     if (res.data.success || res.data.report) {
  //       setUrl("");
  //       navigate(`/results-page?url=${encodeURIComponent(url)}`);
  //       // console.log("Made it to the final state of this form");

  //       // navigate("/results-page");
  //     } else {
  //       alert("URL could not be reached. Please check the address.");
  //     }
  //   } catch (err) {
  //     alert("URL could not be reached. Please check the address.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isValidFormat) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/url/report", {
        url,
      });

      if (res.data.success && res.data.report) {
        const savedUrl = res.data.report.url;
        // Navigate to the results page with the URL as a query param
        navigate(`/results-page?url=${encodeURIComponent(savedUrl)}`);
      } else {
        alert("Something went wrong. Report could not be saved.");
      }
    } catch (err) {
      alert("URL could not be reached. Please check the address.");
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
