import { useAuth } from "../../context/AuthContext";
import api from "../../api";

const LoginButtons = () => {
  const { user, logout, loading } = useAuth();

  if (loading)
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
    );

  const BACKEND = api.defaults.baseURL;

  return user ? (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar}
        alt="avatar"
        className="w-8 h-8 rounded-full border"
      />
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {user.name}
      </span>
      <button onClick={logout} className="btn bg-red-600 text-white">
        Logout
      </button>
    </div>
  ) : (
    <div className="flex gap-3">
      <a href={`${BACKEND}/api/auth/google`} className="btn">
        Google
      </a>
      <a href={`${BACKEND}/api/auth/github`} className="btn">
        GitHub
      </a>
    </div>
  );
};

export default LoginButtons;
