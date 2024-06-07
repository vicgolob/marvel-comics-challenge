import PropTypes from 'prop-types';

import './CharacterCard.scss';

import X from '@/assets/x.png';
import IconHeartRed from '@/assets/icon-heart-red.svg?react';
import IconHeartWhite from '@/assets/icon-heart-white.svg?react';

function CharacterCard({ isFavorite = false }) {
  return (
    <div className="character-card">
      <div className="character-image-container">
        <img className="character-image" src={X} alt="" />
      </div>
      <div className="character-curtain" />
      <div className="character-description-container">
        <p className="text-small">NAME</p>
        {isFavorite ? (
          <IconHeartRed className="is-favorite-icon" width={12} />
        ) : (
          <IconHeartWhite width={12} />
        )}
      </div>
    </div>
  );
}

export default CharacterCard;

CharacterCard.propTypes = {
  isFavorite: PropTypes.bool,
};
