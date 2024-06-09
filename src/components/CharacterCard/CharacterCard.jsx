import PropTypes from 'prop-types';

import './CharacterCard.scss';

import IconHeartRed from '@/assets/icon-heart-red.svg?react';
import IconHeartWhite from '@/assets/icon-heart-white.svg?react';

function CharacterCard({ name, image, isFavorite = false }) {
  return (
    <div className="character-card">
      <div className="character-image-container">
        <img className="character-image" src={image} alt="" />
      </div>

      <div className="divider" />

      <div className="character-description-container">
        <div className="character-curtain" />
        <p className="text-small character-description-name">
          {name.toUpperCase()}
        </p>

        {isFavorite ? (
          <IconHeartRed
            data-testid="red-heart-icon"
            className="is-favorite-icon"
            width="12px"
          />
        ) : (
          <IconHeartWhite data-testid="red-heart-empty" width="12px" />
        )}
      </div>
    </div>
  );
}

export default CharacterCard;

CharacterCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  isFavorite: PropTypes.bool,
};
