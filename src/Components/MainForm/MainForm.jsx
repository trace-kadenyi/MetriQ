import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../Accessories/FramerMotion";

import Popup from "../Accessories/Popup";

import { useUrlFormContext } from "../../context/UrlFormContext";
const MainForm = ({ formClass = "", inputClass = "", buttonClass = "" }) => {
  const {
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
  } = useUrlFormContext();
  const navigate = useNavigate();
  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className={`md:w-3/4 dark:text-gray-300 ${formClass}`}
        variants={fadeUp}
      >
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Enter site URL"
          autoFocus
          required
          className={`px-4 py-2 border border-gray-300 rounded-lg shadow-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500
  focus:border-blue-500 my-2 hover:border-white
  dark:border-gray-400 dark:hover:border-gray-400 hover:ring-2
  ${inputClass || "w-3/4 md:w-1/2 mr-4"}`}
        />

        {url && !hasSubmitted && (
          <p
            className={`text-sm ${
              isValidFormat ? "text-green-600" : "text-red-600"
            }`}
          >
            {isValidFormat ? "URL format looks good" : "Invalid URL format"}
          </p>
        )}
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 dark:bg-blue-900 rounded-lg my-2 flex items-center justify-center min-w-[120px] ${
            loading
              ? "cursor-default"
              : "cursor-pointer hover:bg-white dark:hover:bg-gray-400 hover:text-blue-500 hover:font-semibold dark:hover:text-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Analyze Now"
          )}
        </button>
      </motion.form>
      {/* show popup */}
      <div className="z-1000">
        {showPopup && (
          <Popup
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            loading={loading}
            setLoading={setLoading}
            partialResults={partialResults}
            submittedUrl={submittedUrl}
            showLongWaitMessage={showLongWaitMessage}
            navigate={navigate}
          />
        )}
      </div>
    </>
  );
};

export default MainForm;
