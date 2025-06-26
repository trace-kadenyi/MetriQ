import { useNavigate, useLocation } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import useUrlForm from "../hooks/urlForm";
import { Search } from "lucide-react";

import Popup from "./Popup";

const Header = () => {
  const { favourites } = useFavourites();
  const navigate = useNavigate();
  const location = useLocation();
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

  const goToReports = (url) => {
    navigate(`/reports?url=${encodeURIComponent(url)}`);
  };

  const isLandingPage = location.pathname === "/";

  return (
    <header className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white fixed top-0 z-[50] shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center sm:flex-nowrap gap-4 px-4 py-3">
        {/* Branding */}
        <div
          className="text-2xl font-bold tracking-tight cursor-pointer hover:text-orange-400 transition"
          onClick={() => navigate("/")}
        >
          MetricMind
        </div>

        {/* Search Form */}
        {!isLandingPage && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-lg shadow-sm px-2 py-1 w-full max-w-xl"
          >
            <input
              type="text"
              value={url}
              onChange={handleChange}
              placeholder="Enter site URL"
              required
              className="flex-grow px-4 py-2 text-sm text-gray-800 rounded-l-lg focus:outline-none"
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
        )}
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
        {/* Favourites */}
        <div className="relative group inline-block">
          {/* Trigger */}
          <button className="flex items-center gap-2 px-4 py-2 transition">
            <span role="img" aria-label="heart">
              🤍
            </span>
            <span className="text-sm font-medium">Favourites</span>
          </button>

          {/* Dropdown */}
          <div className="absolute left-0 top-full z-50 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg opacity-0 scale-95 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
            {favourites.length > 0 && (
              <ul className="space-y-2 text-sm">
                {favourites.map((url) => (
                  <li key={url}>
                    <button
                      onClick={() => goToReports(url)}
                      className="text-left w-full text-blue-600 hover:text-orange-400 transition"
                    >
                      {url}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
