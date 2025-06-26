// src/context/FavouritesContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getAnonymousId } from "../utils/getAnonymousId";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]); // Safe default for initial render
  const [loading, setLoading] = useState(false);

  const anonId = getAnonymousId();

  /** GET /api/favourites */
  const fetchFavourites = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:4000/api/favourites", {
        headers: { "x-anon-id": anonId },
      });

      if (Array.isArray(data.favourites)) {
        setFavourites(data.favourites);
      } else {
        console.warn("Unexpected data shape:", data);
        setFavourites([]); // fallback just in case
      }
    } catch (err) {
      console.error("Error fetching favourites:", err);
      toast.error(err.response?.data?.message || "Failed to load favourites");
      setFavourites([]); // fallback to prevent crashes
    } finally {
      setLoading(false);
    }
  }, [anonId]);

  /** POST /api/favourites/toggle */
  const toggleFavourite = useCallback(
    async (url) => {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/favourites/toggle",
          { url },
          { headers: { "x-anon-id": anonId } }
        );

        if (Array.isArray(data.favourites)) {
          setFavourites(data.favourites);
        } else {
          console.warn("Unexpected toggle response:", data);
        }
      } catch (err) {
        console.error("Error toggling favourite:", err);
        toast.error(
          err.response?.data?.message || "Failed to update favourites"
        );
      }
    },
    [anonId]
  );

  /** Check if a URL is in favourites (guarded) */
  const isFavourite = useCallback(
    (url) => favourites.includes(url),
    [favourites]
  );

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
  if (!ctx) {
    throw new Error("useFavourites must be used inside <FavouritesProvider>");
  }
  return ctx;
}
