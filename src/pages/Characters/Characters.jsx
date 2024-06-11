import { useContext, useEffect, useState } from 'react';

import { CharacterCard, ProgressBar, Search } from '@/components/index.js';
import { getCharacters } from '@/api/charactersApi.js';
import { Context } from '@/context/CharactersContext';

import './Characters.scss';

function Characters() {
  const { isFavoriteCharacter, isFilterActive, favorites, isFavoritesEmpty } =
    useContext(Context);
  let [charactersList, setCharactersList] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(true);

  function updateCharactersList(results) {
    setCharactersList(results);

    setTimeout(() => {
      setShowProgressBar(false);
    }, 50);
  }

  useEffect(() => {
    const getCharactersList = async () => {
      const results = await getCharacters({ limit: 50 });
      updateCharactersList(results);
    };

    if (isFilterActive) {
      updateCharactersList(favorites);
    } else {
      getCharactersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterActive]);

  const handleSearch = async (searchTerm) => {
    setShowProgressBar(true);

    try {
      let results;

      if (!isFilterActive) {
        // Query from API
        results = await getCharacters({
          ...(searchTerm && { nameStartsWith: searchTerm }),
          limit: 50,
        });
      } else {
        // Query among favorites
        results = favorites.filter(({ name }) => name.includes(searchTerm));
      }

      updateCharactersList(results);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <>
      {showProgressBar && <ProgressBar />}

      <div className="page-container">
        {isFilterActive && (
          <h2 className="text-l favorites-title">FAVORITES</h2>
        )}
        <Search onSearch={handleSearch} resultsCount={charactersList.length} />
        {isFilterActive && isFavoritesEmpty ? (
          <p className="no-favorites">NO FAVORITES YET</p>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default Characters;
