import React from "react";
import { Link } from "react-router-dom";

type AsteroidCardProps = {
  asteroid: {
    id: string;
    name: string;
    absoluteMagnitude?: number;
    isPotentiallyHazardous?: boolean;
    nasaJplUrl?: string;
  };
};

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
  const imageId = Math.floor(Math.random() * 9) + 1;

  return (
    <Link to={`/asteroid/${asteroid.id}`} className="block">
      <div
        id="asteroidCard"
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
      >
        <img
          src={`/pets/DrawKit Vector Illustration Animal & Pets (${imageId}).svg`}
          alt={asteroid.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {asteroid.name}
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <span className="font-medium">ID:</span> {asteroid.id}
            </li>
            {asteroid.absoluteMagnitude !== undefined && (
              <li>
                <span className="font-medium">Absolute Magnitude:</span>{" "}
                {asteroid.absoluteMagnitude.toFixed(2)}
              </li>
            )}
            {asteroid.isPotentiallyHazardous !== undefined && (
              <li>
                <span className="font-medium">Potentially Hazardous:</span>
                <span
                  className={
                    asteroid.isPotentiallyHazardous
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {asteroid.isPotentiallyHazardous ? " Yes" : " No"}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default AsteroidCard;
