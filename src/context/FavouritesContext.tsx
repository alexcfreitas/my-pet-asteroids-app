import React, { createContext, useContext, useState, ReactNode } from "react";

interface FavouritesContextType {
  favourites: string[];
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavouritesContext must be used within a FavouritesProvider"
    );
  }
  return context;
};

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  const addFavourite = (id: string) => {
    setFavourites((prev) => [...prev, id]);
  };

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((favId) => favId !== id));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
