import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

const BACKEND = api.defaults.baseURL;

export default function LoginButtons({ variant = "header" }) {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Loading…
      </div>
    );
  }

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
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-17.7-1.6-35-4.7-51.5H272.1v97.5h147.3c-6.4 34.7-25.5 64.1-54.4 83.8v69.3h87.8c51.4-47.3 80.7-117.1 80.7-199.1z"
            />
            <path
              fill="#34A853"
              d="M272.1 544.3c73.9 0 135.9-24.5 181.2-66.7l-87.8-69.3c-24.3 16.3-55.3 26-93.4 26-71.8 0-132.6-48.4-154.3-113.5H28.6v71.3c45.4 90.2 138.3 151.9 243.5 151.9z"
            />
            <path
              fill="#FBBC05"
              d="M117.8 320.8c-10.1-29.7-10.1-61.6 0-91.3V158.1H28.6c-38.8 77.6-38.8 169 0 246.6l89.2-69.3z"
            />
            <path
              fill="#EA4335"
              d="M272.1 107.7c39.8 0 75.6 13.7 103.8 40.6l77.6-77.6C407.9 24.5 345.9 0 272.1 0 166.9 0 74 61.7 28.6 151.9l89.2 69.3c21.7-65.1 82.5-113.5 154.3-113.5z"
            />
          </svg>
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
      <div className="flex items-center gap-3">
        <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
        <span className="text-xs font-medium text-white dark:text-gray-200">
          {user.name}
        </span>
        <button
          onClick={logout}
          className="group flex items-center gap-1 hover:text-red-500 transition"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="text-red-600 w-6 h-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"></path>
          </svg>
          <span className="invisible group-hover:visible text-red-500 font-semibold italic underline text-xs">
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
    >
      Sign In
    </button>
  );
}
