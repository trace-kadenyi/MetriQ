// components/UrlForm.js
import { useState } from "react";
import axios from "axios";

export default function useUrlForm() {
  const [url, setUrl] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!isValidFormat) return;

    try {
      const res = await axios.post("http://localhost:4000/api/url/check", {
        url,
      });

      if (res.data.success) {
        console.log("Made it to the final state of this form");
      } else {
        alert("URL could not be reached. Please check the address.");
      }
    } catch (err) {
      alert("URL could not be reached. Please check the address.");
    }
  };

  return {
    url,
    isValidFormat,
    hasSubmitted,
    handleChange,
    handleSubmit,
  };
}
