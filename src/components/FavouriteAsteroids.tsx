import React, { useEffect, useState } from "react";
import { useFavouritesContext } from "../context/FavouritesContext";
import { fetchAsteroidDetail, AsteroidDetails } from "../services/api";
import AsteroidCard from "./AsteroidCard";

const FavouriteAsteroids: React.FC = () => {
  const { favourites } = useFavouritesContext();
  const [asteroids, setAsteroids] = useState<AsteroidDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Promise.all(
          favourites.map((id) => fetchAsteroidDetail(id))
        );
        setAsteroids(data);
      } catch (err) {
        setError("Failed to fetch favourite asteroids.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [favourites]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Favourite Space Rock Companions
      </h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : asteroids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids.map((asteroid) => (
            <AsteroidCard
              key={asteroid.id}
              asteroid={{
                id: asteroid.id,
                name: asteroid.name,
                absoluteMagnitude: asteroid.absolute_magnitude_h,
                isPotentiallyHazardous:
                  asteroid.is_potentially_hazardous_asteroid,
                nasaJplUrl: asteroid.nasa_jpl_url,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">
          You haven't added any asteroids to your favourites yet.
        </p>
      )}
    </div>
  );
};

export default FavouriteAsteroids;
