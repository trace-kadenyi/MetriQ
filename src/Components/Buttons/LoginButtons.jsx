import { useAuth } from "../contexts/AuthContext";

export default function LoginButtons() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  return user ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <div className="flex gap-3">
      <a href="/api/auth/google" className="btn">
        Google
      </a>
      <a href="/api/auth/github" className="btn">
        GitHub
      </a>
    </div>
  );
}
