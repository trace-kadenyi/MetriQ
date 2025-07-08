import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api";
import { getAnonymousId } from "../utils/getAnonymousId";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = unknown, false = anon
  const [loading, setLoading] = useState(true);
  const [anonId, setAnonId] = useState(getAnonymousId());

  /* ─── Helpers ───────────────────────────────────────────── */

  const fetchMe = useCallback(async () => {
    try {
      const { data } = await api.get("/api/auth/me"); // <- create this
      setUser(data.user || false); // false === unauth
    } catch (_) {
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await api.post("/api/auth/logout");
    // Start fresh anon session
    const newAnon = crypto.randomUUID();
    localStorage.setItem("anonymousUserId", newAnon);
    setAnonId(newAnon);
    setUser(false);
    toast.success("Logged out");
  }, []);

  /* ─── initial load ──────────────────────────────────────── */
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  /* expose */
  const value = { user, loading, anonId, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside <AuthProvider>");
  return ctx;
}
