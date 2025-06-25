import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// create context
const FavouritesContext = createContext();

// provider
export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch favourites on app load
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/favourites"
        );
        if (data.success) {
          setFavourites(data.favourites);
        } else {
          toast.error("No favourites list found");
        }
      } catch (err) {
        console.error("Error fetching favourites: ", err);
        toast.error("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [favourites]);

  //   toggle a favourite
  const toggleFavourites = async (url) => {
    if (!url || typeof url !== "string") {
      toast.error("Invalid URL provided for toggle.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/favourites/toggle",
        { url }
      );
      if (data.success) {
        setFavourites(data.favourites);
      } else {
        toast.error("Could not edit the favourites list");
      }
    } catch (err) {
      console.error("Error editing the favourites list:", err);
      toast.error(
        "An unexpected error occurred while editing the favourites list. Please try again later."
      );
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, loading, toggleFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// hook to access context
export const useFavourites = () => useContext(FavouritesContext);
