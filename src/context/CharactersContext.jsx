import PropTypes from 'prop-types';
import { createContext, useState, useRef } from 'react';

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
  const [isFilterActive, setIsFilterActive] = useState(false);
  const shouldResetSearch = useRef(false);

  const addToFavorite = (item) => {
    const updatedItems = [...favorites, item];
    setFavorites(updatedItems);
    updateStorage(updatedItems);
  };

  const removeFromFavorite = (idToRemove) => {
    const updatedItems = favorites.filter(({ id }) => id !== idToRemove);
    setFavorites(updatedItems);
    updateStorage(updatedItems);
  };

  const isFavoriteCharacter = (idToFavorite) =>
    favorites.some(({ id }) => id === idToFavorite);

  const favoriteCount = favorites.length;

  const isFavoritesEmpty = favorites.length === 0;

  function toggleIsFilterActive() {
    setIsFilterActive(!isFilterActive);
  }

  const value = {
    favorites,
    addToFavorite,
    removeFromFavorite,
    isFavoriteCharacter,
    favoriteCount,
    isFavoritesEmpty,
    isFilterActive,
    toggleIsFilterActive,
    shouldResetSearch,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
