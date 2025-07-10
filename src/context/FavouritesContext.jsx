import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import api from "../api.js";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const { user, loading: authLoading, anonId } = useAuth();

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const isLogged = Boolean(user && (user._id || user.id));

  /* ------------- FETCH ----------------- */
  const fetchFavourites = useCallback(async () => {
    if (authLoading) return; // wait for auth to settle
    setLoading(true);
    try {
      const { data } = await api.get("/api/favourites", {
        headers: !isLogged && anonId ? { "x-anon-id": anonId } : {},
      });
      setFavourites(Array.isArray(data.favourites) ? data.favourites : []);
    } catch (err) {
      toast.error("Could not load favourites");
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  }, [authLoading, isLogged, anonId]);

  /* ------------- TOGGLE ----------------- */
  const toggleFavourite = useCallback(
    async (url) => {
      if (authLoading) return;
      try {
        const { data } = await api.post(
          "/api/favourites/toggle",
          { url },
          { headers: !isLogged && anonId ? { "x-anon-id": anonId } : {} }
        );
        setFavourites(Array.isArray(data.favourites) ? data.favourites : []);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to toggle favourite"
        );
      }
    },
    [authLoading, isLogged, anonId]
  );

  const isFavourite = useCallback(
    (url) => favourites.includes(url),
    [favourites]
  );

  /* ------------- CLAIM anon list after login --------------- */
  useEffect(() => {
    if (isLogged && anonId) {
      (async () => {
        try {
          await api.post("/api/favourites/claim", { anonId });
          localStorage.removeItem("anonymousUserId");
        } catch (_) {
          /* ignore: maybe already claimed */
        } finally {
          fetchFavourites(); // refresh list from owner
        }
      })();
    }
  }, [isLogged, anonId, fetchFavourites]);

  /* initial load + on auth change */
  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const value = {
    favourites,
    loading,
    toggleFavourite,
    isFavourite,
    refetchFavourites: fetchFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx)
    throw new Error("useFavourites must be inside <FavouritesProvider>");
  return ctx;
}
