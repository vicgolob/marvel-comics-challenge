import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const Context = createContext();

const STORAGE_NAME = 'marvel-favorites';

function updateStorage(items) {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(items));
}

function getStorageItems() {
  return localStorage.getItem(STORAGE_NAME);
}

const Provider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const value = getStorageItems();
    return value ? JSON.parse(value) : [];
  });

  const addToFavorite = (item) => {
    const updatedItems = [...favorites, item];
    setFavorites(updatedItems);
    updateStorage(updatedItems);
  };

  const removeFromFavorite = (id) => {
    const updatedItems = favorites.filter((item) => item !== id);
    setFavorites(updatedItems);
    updateStorage(updatedItems);
  };

  const isFavoriteCharacter = (id) => favorites.some((item) => item === id);

  const favoriteCount = favorites.length;

  const isFavoritesEmpty = favorites.length === 0;

  const value = {
    favorites,
    addToFavorite,
    removeFromFavorite,
    isFavoriteCharacter,
    favoriteCount,
    isFavoritesEmpty,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
