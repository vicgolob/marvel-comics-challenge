import PropTypes from 'prop-types';

import IconHeartRed from '@/assets/icon-heart-red.svg?react';
import IconHeartWhite from '@/assets/icon-heart-white.svg?react';

function FavoriteBtn({ isFavorite = false }) {
  return (
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
  );
}

export default FavoriteBtn;

FavoriteBtn.propTypes = {
  isFavorite: PropTypes.bool,
};
