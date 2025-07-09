import { useNavigate, useLocation } from "react-router-dom";
import { Star } from "lucide-react";

import { useFavourites } from "../../context/FavouritesContext";

import logo from "../../assets/zyntra_logo.png";
import ThemeToggle from "../Accessories/ThemeToggle";
import HeaderForm from "../Forms/HeaderForm";
import LoginButtons from "../Buttons/LoginButtons";

const PrimaryHeader = () => {
  const { favourites = [] } = useFavourites();
  const navigate = useNavigate();
  const location = useLocation();

  const goToReports = (url) => {
    navigate(`/reports?url=${encodeURIComponent(url)}`);
  };

  const isLandingPage = location.pathname === "/";

  const isLoginPage = location.pathname === "/login";

  return (
    <header className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white dark:text-gray-300 fixed top-0 z-[50] shadow-md">
      <div
        className={`max-w-7xl mx-auto flex justify-between gap-4 p-3 ${
          isLandingPage
            ? "flex-col sm:flex-row"
            : "flex-col items-center justify-between md:flex-row"
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
          <span className="text-xl pr-4 font-bold tracking-tight">Zyntra</span>
        </div>

        {/* Search Form */}
        {!isLandingPage && <HeaderForm />}
        <div
          className={`flex justify-between items-center ${
            isLandingPage ? "w-1/2 sm:w-3/4 md:w-1/2 gap-5 pl-5 sm:gap-3" : "w-full gap-1"
          }`}
        >
          {/* Favourites */}
          <div className="relative group inline-block">
            {/* Trigger */}
            <button className="flex items-center gap-2 sm:px-4 py-2 transition cursor-pointer">
              <span role="img" aria-label="heart">
                <Star className="text-orange-500 fill-orange-400 w-3 h-3" />
              </span>
              <span className="text-xs sm:text-sm font-medium">Favourites</span>
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
                <p className="text-gray-800 dark:text-gray-200 text-xs font-semibold">
                  No favourites yet
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {!isLoginPage && <LoginButtons />}
          </div>
          {/* themes */}
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PrimaryHeader;
