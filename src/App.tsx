import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsteroidList from "./components/AsteroidList";
import AsteroidDetail from "./components/AsteroidDetail";
import FavouriteAsteroids from "./components/FavouriteAsteroids";
import Header from "./components/Header";
import { FavouritesProvider } from "./context/FavouritesContext";
import "react-datepicker/dist/react-datepicker.css";

const App: React.FC = () => (
  <FavouritesProvider>
    <Router>
      <div className="bg-gray-100 min-h-screen font-space-grotesk">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<AsteroidList />} />
            <Route path="/asteroid/:id" element={<AsteroidDetail />} />
            <Route path="/favourites" element={<FavouriteAsteroids />} />
          </Routes>
        </main>
      </div>
    </Router>
  </FavouritesProvider>
);

export default App;
