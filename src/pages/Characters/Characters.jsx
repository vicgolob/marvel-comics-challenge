import { useContext, useEffect, useState } from 'react';

import {
  CharacterCard,
  ProgressBar,
  Search,
  ErrorMessage,
} from '@/components/index.js';
import { getCharacters } from '@/api/charactersApi.js';
import { Context } from '@/context/CharactersContext';

import './Characters.scss';

function Characters() {
  const { isFavoriteCharacter, isFilterActive, favorites, isFavoritesEmpty } =
    useContext(Context);
  let [charactersList, setCharactersList] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [error, setError] = useState(null);

  function updateCharactersList(results) {
    setCharactersList(results);

    setTimeout(() => {
      setShowProgressBar(false);
    }, 50);
  }

  useEffect(() => {
    const getCharactersList = async () => {
      const { results, error } = await getCharacters({ limit: 50 });
      if (results) {
        updateCharactersList(results);
      } else {
        setError(error);
      }
    };

    if (isFilterActive) {
      updateCharactersList(favorites);
    } else {
      getCharactersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterActive]);

  useEffect(() => {
    if (isFilterActive) {
      setCharactersList(favorites);
    }
  }, [isFilterActive, favorites]);

  const handleSearch = async (searchTerm) => {
    setShowProgressBar(true);

    let results;
    let error;

    if (!isFilterActive) {
      // Query from API
      const response = await getCharacters({
        ...(searchTerm && { nameStartsWith: searchTerm }),
        limit: 50,
      });
      results = response.results;
      error = response.error;
    } else {
      // Query among favorites
      results = favorites.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (results) {
      updateCharactersList(results);
    } else {
      setError(error);
    }

    setShowProgressBar(false);
  };

  function displayCharactersResults() {
    if (isFilterActive && isFavoritesEmpty) {
      return <p className="no-favorites">NO FAVORITES YET</p>;
    }

    if (isFilterActive && charactersList.length === 0) {
      return <ErrorMessage message="There are no results to show" />;
    }

    return (
      <div className="character-cards-container">
        {charactersList.map(({ id, name, image }) => (
          <CharacterCard
            key={id}
            id={id}
            name={name}
            image={image}
            isFavorite={isFavoriteCharacter(id)}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {showProgressBar && <ProgressBar />}

      <div className="page-container">
        {isFilterActive && (
          <h2 className="text-l favorites-title">FAVORITES</h2>
        )}
        <Search onSearch={handleSearch} resultsCount={charactersList.length} />

        {error && <ErrorMessage message={error} />}

        {displayCharactersResults()}
      </div>
    </>
  );
}

export default Characters;
