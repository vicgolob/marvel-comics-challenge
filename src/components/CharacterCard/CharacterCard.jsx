import PropTypes from 'prop-types';

import './CharacterCard.scss';

import IconHeartRed from '@/assets/icon-heart-red.svg?react';
import IconHeartWhite from '@/assets/icon-heart-white.svg?react';
import { Link } from 'react-router-dom';

function CharacterCard({ id, name, image, isFavorite = false }) {
  function generateCharacterNameSlug() {
    return name.toLowerCase().replace(/ /g, '-');
  }
  return (
    <div className="character-card">
      <Link
        to={`/characters/${generateCharacterNameSlug()}`}
        state={{ characterId: id }}
      >
        <div className="character-image-container">
          <img className="character-image" src={image} alt="" />
        </div>
      </Link>

      <div className="divider" />

      <div className="character-description-container">
        <div className="character-curtain" />
        <p className="text-small character-description-name">
          {name.toUpperCase()}
        </p>

        <button className="icon-btn">
          {isFavorite ? (
            <IconHeartRed
              onClick={() => {}}
              data-testid="red-heart-icon"
              className="is-favorite-icon"
              width="12px"
            />
          ) : (
            <IconHeartWhite data-testid="red-heart-empty" width="12px" />
          )}
        </button>
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
