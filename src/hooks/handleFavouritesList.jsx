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
