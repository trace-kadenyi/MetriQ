import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

const Header = () => {
  const { favourites } = useFavourites();
  const navigate = useNavigate();

  const goToReports = (url) => {
    navigate(`/reports?url=${encodeURIComponent(url)}`);
  };

  return (
    <header className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white sticky top-0 z-[50] shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Branding */}
        <div
          className="text-xl font-bold tracking-tight cursor-pointer hover:text-orange-400 transition"
          onClick={() => navigate("/")}
        >
          MetricMind
        </div>

        <div className="relative group inline-block">
          {/* Trigger */}
          <button className="flex items-center gap-2 px-4 py-2 transition">
            <span role="img" aria-label="heart">
              🤍
            </span>
            <span className="text-sm font-medium">Favourites</span>
          </button>

          {/* Dropdown */}
          <div
            className="
            absolute left-0 top-full z-50 w-64
            rounded-2xl border border-gray-100 bg-white p-4 shadow-lg
            opacity-0 scale-95 pointer-events-none
            transition-all duration-200 ease-out
            group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
          "
          >
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
