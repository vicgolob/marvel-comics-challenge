import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import IconHeartRed from '@/assets/icon-heart-red.svg?react';
import IconHeartWhite from '@/assets/icon-heart-white.svg?react';
import { FavoriteBtn } from '@/components/index.js';

import './CharacterCard.scss';

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
          <img className="character-image" src={image} role="presentation" />
        </div>
      </Link>

      <div className="divider" />

      <div className="character-description-container">
        <div className="character-curtain" />
        <p className="text-small character-description-name">
          {name.toUpperCase()}
        </p>

        <FavoriteBtn isFavorite={isFavorite} />
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
