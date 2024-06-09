import { useEffect, useState } from 'react';
import { CharacterCard, ProgressBar } from '@/components/index.js';
import { getCharacters } from '@/api/charactersApi';

import './Characters.scss';

function Characters() {
  const [charactersList, setCharactersList] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(true);

  function buildCharacters(characters) {
    return characters.map(({ id, name, description, thumbnail }) => ({
      id,
      name,
      description,
      image: `${thumbnail.path}/portrait_medium.${thumbnail.extension}`,
    }));
  }

  useEffect(() => {
    const getCharactersList = async () => {
      const results = await getCharacters({ limit: 50 });
      setCharactersList(buildCharacters(results));

      setTimeout(() => {
        setShowProgressBar(false);
      }, 50);
    };

    getCharactersList();
  }, []);

  return (
    <>
      {showProgressBar && <ProgressBar />}

      <div className="page-container">
        <div className="character-cards-container">
          {charactersList.map(({ id, name, image }, index) => (
            <CharacterCard
              key={id}
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
