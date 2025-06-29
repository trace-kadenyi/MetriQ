import { useNavigate, useLocation } from "react-router-dom";
import { Search, Star } from "lucide-react";

import { useFavourites } from "../../context/FavouritesContext";
import useUrlForm from "../../hooks/urlForm";
import Popup from "../Accessories/Popup";
import logo from "../../assets/zyntra_logo.png";
import ThemeToggle from "../Accessories/ThemeToggle";

const PrimaryHeader = () => {
  const { favourites = [] } = useFavourites();
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
    <header className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white dark:text-gray-300 fixed top-0 z-[50] shadow-md">
      <div
        className={`max-w-7xl mx-auto flex justify-between gap-4 p-3 ${
          isLandingPage
            ? "flex-col sm:flex-row"
            : "flex-wrap items-center sm:flex-nowrap"
        }
        `}
      >
        {/* Branding */}
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-orange-400 transition px-4 sm:px-0"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Zyntra Logo"
            className="w-4 h-4 sm:w-5 h-5 object-contain"
          />
          <span className="text-md sm:text-xl pr-4 font-bold tracking-tight">
            Zyntra
          </span>
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
          <button className="flex items-center gap-2 px-4 py-2 transition cursor-pointer">
            <span role="img" aria-label="heart">
              <Star className="text-orange-500 fill-orange-400 w-3 h-3" />
            </span>
            <span className="text-sm font-medium">Favourites</span>
          </button>

          {/* Dropdown */}
          <div
            className="absolute top-full left-0 sm:left-auto sm:right-0 z-50
                w-64 max-w-[90vw]
                rounded-2xl border border-gray-100 bg-white p-4 shadow-lg
                opacity-0 scale-95 pointer-events-none transition-all
                duration-200 ease-out origin-top-right
                group-hover:opacity-100 group-hover:scale-100
                group-hover:pointer-events-auto dark:bg-blue-950"
          >
            {favourites.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {favourites.map((url) => {
                  const truncated =
                    url.length > 70 ? url.slice(0, 60) + "…" : url;
                  return (
                    <li key={url}>
                      <button
                        onClick={() => goToReports(url)}
                        className="text-left w-full text-gray-800 text-xs underline hover:text-orange-400 transition break-all dark:text-gray-300"
                      >
                        {truncated}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-800 text-xs font-semibold">
                No favourites yet
              </p>
            )}
          </div>
        </div>
        {/* themes */}
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default PrimaryHeader;
