import React, { useState } from "react";
import { fetchAsteroids } from "../services/api";
import SearchForm from "./SearchForm";
import AsteroidCard from "./AsteroidCard";
import SortButton from "./SortButton";

type Asteroid = {
  id: string;
  name: string;
  absoluteMagnitude?: number;
  isPotentiallyHazardous?: boolean;
  nasaJplUrl?: string;
};

const AsteroidList: React.FC = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSearch = async (startDate: string, endDate: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAsteroids(startDate, endDate);
      setAsteroids(data || []);
      setHasSearched(true);
    } catch (err: any) {
      setError(
        err.response?.data?.errors[0]?.message || "Failed to fetch asteroids."
      );
      setAsteroids([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSortByName = () => {
    const sorted = [...asteroids].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setAsteroids(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Discover Your Space Rock Companion
      </h1>
      <div className="w-full max-w-2xl mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && hasSearched && asteroids.length === 0 && (
        <p className="text-center">
          No asteroids found for the given date range.
        </p>
      )}
      {!hasSearched && (
        <p className="text-center">
          Please enter a date range to search for asteroids.
        </p>
      )}
      {asteroids.length > 0 && (
        <>
          <SortButton
            onSort={handleSortByName}
            label={`Name (${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
          />
          <div
            id="asteroidGrid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {asteroids.map((asteroid) => (
              <AsteroidCard key={asteroid.id} asteroid={asteroid} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AsteroidList;
