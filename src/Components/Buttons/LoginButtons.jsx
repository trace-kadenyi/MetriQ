// src/components/Buttons/LoginButtons.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

const BACKEND = api.defaults.baseURL;

// One place to keep shared Tailwind classes
const commonBtn =
  "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 rounded-xl font-medium transition shadow border";

const providerBtn = (base) =>
  `${commonBtn} ${base} hover:-translate-y-0.5 hover:shadow-lg`;

export default function LoginButtons({ variant = "header" }) {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  /* ───────── Loading state ───────── */
  if (loading) {
    return (
      <div className="text-xs text-gray-500 dark:text-gray-400">Loading…</div>
    );
  }

  /* ───────── Provider buttons (only on /login) ───────── */
  if (variant === "providers") {
    return (
      <div className="flex flex-col gap-4">
        {/* Google */}
        <a
          href={`${BACKEND}/api/auth/google`}
          className={providerBtn(
            "bg-white text-gray-800 border-[#4285F4] hover:bg-[#4285F4]/10 dark:bg-blue-900 dark:text-gray-100"
          )}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            {/* …svg path for Google icon… */}
          </svg>
          Continue with Google
        </a>

        {/* GitHub */}
        <a
          href={`${BACKEND}/api/auth/github`}
          className={providerBtn(
            "bg-white text-gray-800 border-gray-700 hover:bg-gray-700/10 dark:bg-blue-900 dark:text-gray-100"
          )}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            {/* …svg path for GitHub icon… */}
          </svg>
          Continue with GitHub
        </a>
      </div>
    );
  }

  /* ───────── Header use (login vs logout) ───────── */
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full border"
        />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {user.name}
        </span>
        <button
          onClick={logout}
          className="px-3 py-1 rounded-md text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition"
        >
          Logout
        </button>
      </div>
    );
  }

  // Not logged in → little “Login” CTA that navigates to /login
  return (
    <button
      onClick={() => navigate("/login")}
      className="w-15 cursor-pointer text-xs bg-gray-50 dark:bg-gray-200 p-1 rounded-md text-gray-800 font-semibold hover:bg-orange-400 hover:text-gray-50"
    >
      Sign In
    </button>
  );
}
