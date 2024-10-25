import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Pet Asteroids</h1>
        </div>
      </Link>
      <nav>
        <Link
          to="/favourites"
          className="text-gray-600 hover:text-gray-800 transition duration-300"
        >
          Favourites
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
