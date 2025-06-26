import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import useUrlForm from "../hooks/urlForm";
import { Search } from "lucide-react";

const Header = () => {
  const { favourites } = useFavourites();
  const navigate = useNavigate();
  const {
    handleSubmit,
    hasSubmitted,
    url,
    handleChange,
    loading,
    isValidFormat,
  } = useUrlForm();

  const goToReports = (url) => {
    navigate(`/reports?url=${encodeURIComponent(url)}`);
  };

  return (
    <header className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white sticky top-0 z-[50] shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 px-4 py-3">
        {/* Branding */}
        <div
          className="text-2xl font-bold tracking-tight cursor-pointer hover:text-orange-400 transition"
          onClick={() => navigate("/")}
        >
          MetricMind
        </div>

        {/* Search Form */}
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

        {/* Favourites */}
        <div className="relative group inline-block">
          <button className="flex items-center gap-2 px-4 py-2 transition text-white hover:text-orange-400">
            <span role="img" aria-label="heart">
              🤍
            </span>
            <span className="text-sm font-medium">Favourites</span>
          </button>

          <div
            className="absolute right-0 top-full mt-1 z-50 w-64
              rounded-2xl border border-gray-100 bg-white p-4 shadow-lg
              opacity-0 scale-95 pointer-events-none
              transition-all duration-200 ease-out
              group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
          >
            {favourites.length > 0 ? (
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
            ) : (
              <p className="text-sm text-gray-500">No favourites yet</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
