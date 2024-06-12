import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  ProgressBar,
  FavoriteBtn,
  ComicCard,
  ErrorMessage,
} from '@/components/index.js';
import { getCharacter, getComicsByCharacter } from '@/api/charactersApi.js';
import { Context } from '@/context/CharactersContext';

import './CharacterDetail.scss';

function CharacterDetail() {
  const location = useLocation();
  const { state: locationState } = location;
  const characterId = locationState?.characterId;
  const { isFavoriteCharacter, addToFavorite, removeFromFavorite } =
    useContext(Context);

  const [character, setCharacter] = useState(undefined);
  const [comicsList, setComicsList] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [error, setError] = useState(undefined);
  const isInitialRender = useRef(true);

  function updateCharacter(result) {
    setCharacter(result);

    setTimeout(() => {
      setShowProgressBar(false);
    }, 50);
  }

  useEffect(() => {
    const getCharacterDetails = async () => {
      try {
        const { result: characterResult, error: characterError } =
          await getCharacter(characterId);
        if (characterError)
          throw { message: characterError, type: 'character' };

        updateCharacter(characterResult);

        const { results: comicsResults, error: comicsError } =
          await getComicsByCharacter(characterId);
        if (comicsError) throw { message: comicsError, type: 'comics' };

        setComicsList(comicsResults);
        isInitialRender.current = false;
      } catch (error) {
        setError(error);
      }
    };

    if (!characterId) {
      setError({
        type: 'character',
        message:
          'Unable to fetch character details. Make sure you navigate from the Characters Page.',
      });
    } else {
      getCharacterDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateFavorites() {
    isFavoriteCharacter(characterId)
      ? removeFromFavorite(characterId)
      : addToFavorite(character);
  }

  return (
    <>
      {showProgressBar && <ProgressBar />}
      <div className="page">
        {error && error.type === 'character' && (
          <ErrorMessage message={error.message} />
        )}
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
                  <FavoriteBtn
                    isFavorite={isFavoriteCharacter(characterId)}
                    handleClick={updateFavorites}
                    isLarge
                  />
                </div>
                <p>{character.description}</p>
              </div>
            </div>

            {error && error.type === 'comics' && (
              <ErrorMessage message={error.message} />
            )}

            <div className="character-comics-container">
              <h2 className="comics-title">COMICS</h2>
              {!isInitialRender && comicsList.length === 0 ? (
                <ErrorMessage
                  message={'There are no comics for this character'}
                />
              ) : (
                <div className="character-comics-list-container">
                  {comicsList.map(({ id, image, title, year }) => (
                    <ComicCard
                      key={id}
                      image={image}
                      title={title}
                      year={year}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CharacterDetail;
