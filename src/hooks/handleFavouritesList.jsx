import axios from "axios";
import toast from "react-hot-toast";

export const useFetchFavourites = () => {
  const fetchFavourites = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/favourites");
      if (data.success) {
        console.log("Favourites:", data.favourites);
      } else {
        toast.error("No favourites list found");
      }
    } catch (err) {
      console.error("Error fetching favourites: ", err);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };
  return fetchFavourites;
};

export const useToggleFavourites = () => {
  const toggleFavourites = async (url) => {
    if (!url || typeof url !== "string") {
      toast.error("Invalid URL provided for toggle.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/favourites/toggle",
        { url }
      );
      return res.data.favourites;
    } catch (err) {
      console.error("Error editing the favourites list:", err);
      toast.error(
        "An unexpected error occurred while editing the favourites list. Please try again later."
      );
    }
  };

  return toggleFavourites;
};
