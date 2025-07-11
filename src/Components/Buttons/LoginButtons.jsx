import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import api from "../../api.js";
import {
  LogoutIcon,
  GoogleIcon,
  GithubIcon,
} from "../../constants/LogIcons.jsx";

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
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
          {GithubIcon}
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
          type="button"
          onClick={handleLogout}
          className="group flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
          title="logout"
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
      type="button"
      onClick={() => navigate("/login")}
      className="w-15 cursor-pointer text-xs bg-gray-50 dark:bg-gray-200 p-1 rounded-md text-gray-800 font-semibold hover:bg-orange-400 hover:text-gray-50"
      title="sign in"
      aria-label="Sign In"
    >
      Sign In
    </button>
  );
}
