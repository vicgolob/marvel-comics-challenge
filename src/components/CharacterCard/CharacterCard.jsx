import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { FavoriteBtn } from '@/components/index.js';
import { Context } from '@/context/CharactersContext';

import './CharacterCard.scss';

function CharacterCard({ id, name, image, isFavorite = false }) {
  const { addToFavorite, removeFromFavorite } = useContext(Context);

  function generateCharacterNameSlug() {
    return name.toLowerCase().replace(/ /g, '-');
  }

  function updateFavorites() {
    isFavorite
      ? removeFromFavorite(id)
      : addToFavorite({ id, name, image, isFavorite: true });
  }

  return (
    <div className="character-card">
      <Link
        to={`/characters/${generateCharacterNameSlug()}`}
        state={{ characterId: id }}
      >
        <div className="character-image-container">
          <img className="character-image" src={image} role="presentation" />
        </div>
      </Link>

      <div className="divider" />

      <div className="character-description-container">
        <div className="character-curtain" />
        <p className="text-small character-description-name">
          {name.toUpperCase()}
        </p>

        <FavoriteBtn isFavorite={isFavorite} handleClick={updateFavorites} />
      </div>
    </div>
  );
}

export default CharacterCard;

CharacterCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  isFavorite: PropTypes.bool,
};
