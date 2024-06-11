import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ProgressBar, FavoriteBtn, ComicCard } from '@/components/index.js';
import { getCharacter, getComicsByCharacter } from '@/api/charactersApi.js';

import './CharacterDetail.scss';

function CharacterDetail() {
  const location = useLocation();
  const { state: locationState } = location;
  const characterId = locationState ? locationState.characterId : '1010354';

  const [character, setCharacter] = useState(undefined);
  const [comicsList, setComicsList] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(true);

  function updateCharacter(result) {
    setCharacter(result);

    setTimeout(() => {
      setShowProgressBar(false);
    }, 50);
  }

  useEffect(() => {
    const getCharacterDetails = async () => {
      try {
        const result = await getCharacter(characterId);
        updateCharacter(result);

        const comicsResults = await getComicsByCharacter(characterId);
        setComicsList(comicsResults);
      } catch (error) {
        console.error('Failed to fetch character details:', error);
      }
    };

    getCharacterDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  return (
    <>
      {showProgressBar && <ProgressBar />}
      {character && (
        <>
          <div className="character-banner-container">
            <img
              className="character-image"
              src={character.image}
              role="presentation"
            />
            <div className="character-description-container">
              <div className="character-description-title">
                <h1 className="text-xl">{character.name.toUpperCase()}</h1>
                <FavoriteBtn />
              </div>
              <p>{character.description}</p>
            </div>
          </div>
          <div className="character-comics-container">
            <h2>COMICS</h2>
            <div className="character-comics-list-container">
              {comicsList.map(({ id, image, title, year }) => (
                <ComicCard key={id} image={image} title={title} year={year} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CharacterDetail;
