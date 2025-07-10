import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Popup from "../Accessories/Popup";
import useUrlForm from "../../hooks/urlForm";

const HeaderForm = () => {
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
  } = useUrlForm();
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm px-2 py-1 w-full max-w-xl"
      >
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Enter site URL"
          required
          className="flex-grow px-4 py-2 text-sm text-gray-800 dark:text-gray-100 rounded-l-lg focus:outline-none"
        />
        {url && !hasSubmitted && (
          <p
            className={`text-sm px-2 hidden sm:block ${
              isValidFormat ? "text-green-600" : "text-red-600"
            }`}
          >
            {isValidFormat ? "URL format looks good" : "Invalid URL format"}
          </p>
        )}
        <button
          type="submit"
          className="px-3 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </form>
      {/* show popup */}
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
    </>
  );
};

export default HeaderForm;
