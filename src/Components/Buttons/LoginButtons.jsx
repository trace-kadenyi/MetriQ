import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import api from "../../api.js";
import { LogoutIcon, GoogleIcon } from "../../constants/LogIcons.jsx";

// backend url
const BACKEND = api.defaults.baseURL;

export default function LoginButtons({ variant = "header" }) {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  // handle loading state
  if (loading) {
    return (
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Loading…
      </div>
    );
  }

  // handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  // ───────── Providers Only (Login Page) ─────────
  if (variant === "providers") {
    return (
      <div className="flex flex-col mx-auto gap-4 w-full sm:w-80">
        {/* Google */}
        <a
          href={`${BACKEND}/api/auth/google`}
          className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 
                     rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition 
                     hover:bg-gray-100 active:scale-[.98] focus-visible:outline focus-visible:ring-2 
                     focus-visible:ring-blue-500 dark:bg-white dark:text-gray-900"
        >
          {GoogleIcon}
          Continue with Google
        </a>

        {/* GitHub */}
        <a
          href={`${BACKEND}/api/auth/github`}
          className="flex items-center justify-center gap-3 bg-gray-900 text-white border border-gray-900 
                     rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition 
                     hover:bg-gray-800 active:scale-[.98] focus-visible:outline focus-visible:ring-2 
                     focus-visible:ring-gray-500 dark:bg-gray-800"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.084-.729.084-.729 
                1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.495.998.107-.775.42-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 
                0-1.31.47-2.38 1.236-3.22-.135-.303-.54-1.523.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.003-.403 
                c1.02.005 2.045.138 3.003.403 2.28-1.552 3.285-1.23 3.285-1.23 
                .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 
                1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.435.375.81 1.096.81 2.21 
                0 1.595-.015 2.88-.015 3.27 0 .315.21.69.825.57 
                C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"
            />
          </svg>
          Continue with GitHub
        </a>
      </div>
    );
  }

  // ───────── Header Auth Toggle ─────────
  if (user) {
    return (
      <div className="w-30 sm:w-45 flex items-center gap-3 overflow-hidden">
        <img
          src={user.avatar}
          alt={user.name || "User avatar"}
          className="w-6 h-6 rounded-full shrink-0"
        />
        <span
          className="hidden sm:block sm:text-xs font-medium text-white dark:text-gray-200 truncate max-w-[100px]"
          title={user.name}
        >
          {user.name}
        </span>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
          aria-label="Logout"
        >
          {LogoutIcon}
          <span className="md:invisible group-hover:visible text-red-500 font-semibold italic underline text-xs">
            Logout
          </span>
        </button>
      </div>
    );
  }

  // ───────── “Login” Pill in Header ─────────
  return (
    <button
      onClick={() => navigate("/login")}
      className="w-15 cursor-pointer text-xs bg-gray-50 dark:bg-gray-200 p-1 rounded-md text-gray-800 font-semibold hover:bg-orange-400 hover:text-gray-50"
      aria-label="Sign In"
    >
      Sign In
    </button>
  );
}
