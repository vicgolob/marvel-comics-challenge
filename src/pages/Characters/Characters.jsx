import { useCallback, useEffect, useState } from 'react';
import { CharacterCard, ProgressBar, Search } from '@/components/index.js';
import { getCharacters } from '@/api/charactersApi.js';

import './Characters.scss';

function Characters() {
  const [charactersList, setCharactersList] = useState([]);
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

    getCharactersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(async (searchTerm) => {
    setShowProgressBar(true);
    try {
      const results = await getCharacters({
        ...(searchTerm && { nameStartsWith: searchTerm }),
        limit: 50,
      });

      updateCharactersList(results);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showProgressBar && <ProgressBar />}

      <div className="page-container">
        <Search onSearch={handleSearch} resultsCount={charactersList.length} />
        <div className="character-cards-container">
          {charactersList.map(({ id, name, image }, index) => (
            <CharacterCard
              key={id}
              id={id}
              name={name}
              image={image}
              isFavorite={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Characters;
