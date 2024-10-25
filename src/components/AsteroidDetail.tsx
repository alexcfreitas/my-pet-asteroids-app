import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAsteroidDetail, AsteroidDetails } from "../services/api";
import { useFavouritesContext } from "../context/FavouritesContext";

const AsteroidDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asteroid, setAsteroid] = useState<AsteroidDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favourites, addFavourite, removeFavourite } = useFavouritesContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate("/");
        return;
      }
      try {
        const data = await fetchAsteroidDetail(id);
        setAsteroid(data);
      } catch (err) {
        setError("Failed to fetch asteroid details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const isFavourite = id ? favourites.includes(id) : false;

  const toggleFavourite = () => {
    if (!id) return;
    if (isFavourite) {
      removeFavourite(id);
    } else {
      addFavourite(id);
    }
  };

  const filterCloseApproaches = (
    data: AsteroidDetails["close_approach_data"]
  ) => {
    const twoYearsFromNow = new Date();
    twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
    return data
      .filter(
        (approach) => new Date(approach.close_approach_date) <= twoYearsFromNow
      )
      .sort(
        (a, b) =>
          new Date(a.close_approach_date).getTime() -
          new Date(b.close_approach_date).getTime()
      )
      .slice(-5);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!asteroid)
    return <div className="text-center">No asteroid data found.</div>;

  const filteredApproaches = filterCloseApproaches(
    asteroid.close_approach_data
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={`/pets/DrawKit Vector Illustration Animal & Pets (${
              Math.floor(Math.random() * 9) + 1
            }).svg`}
            alt={asteroid.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{asteroid.name}</h2>
          <p>
            <strong>ID:</strong> {asteroid.id}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">Basic Information</h3>
            <a
              href={asteroid.nasa_jpl_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f84531] hover:underline"
            >
              See more
            </a>
          </div>
          <p>
            <strong>Potentially Hazardous:</strong>{" "}
            {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
          </p>
          <p>
            <strong>Estimated Diameter:</strong>{" "}
            {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
              2
            )}{" "}
            -{" "}
            {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
              2
            )}{" "}
            km
          </p>
          <p>
            <strong>Absolute Magnitude:</strong>{" "}
            {asteroid.absolute_magnitude_h.toFixed(2)}
          </p>
          <div className="mt-auto">
            <button
              onClick={toggleFavourite}
              className={`w-full px-4 py-2 rounded ${
                isFavourite
                  ? "bg-red-200 text-red-800"
                  : "bg-[#f84531] text-white"
              }`}
            >
              {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Close Approaches</h3>
        <ul className="space-y-4">
          {filteredApproaches.map((approach, index) => (
            <li key={index} className="border-b pb-2">
              <p>
                <strong>Date:</strong> {approach.close_approach_date}
              </p>
              <p>
                <strong>Velocity:</strong>{" "}
                {parseFloat(
                  approach.relative_velocity.kilometers_per_second
                ).toFixed(2)}{" "}
                km/s
              </p>
              <p>
                <strong>Miss Distance:</strong>{" "}
                {parseInt(approach.miss_distance.kilometers).toLocaleString()}{" "}
                km
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AsteroidDetail;
