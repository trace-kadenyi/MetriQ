// components/Header.jsx
import { useFavourites } from "../context/FavouritesContext";

const Header = () => {
  const { favourites, loading } = useFavourites();

  return (
    <div className="relative group">
      <button className="hover:text-orange-400">❤️ Favourites</button>
      <div className="absolute top-full mt-2 bg-white shadow rounded p-4 hidden group-hover:block z-10">
        {loading ? (
          <p>Loading...</p>
        ) : favourites.length === 0 ? (
          <p>No favourites yet</p>
        ) : (
          <ul className="space-y-2">
            {favourites.map((url) => (
              <li key={url}>
                <a
                  href={`/?url=${encodeURIComponent(url)}`}
                  className="text-blue-600 hover:underline"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
