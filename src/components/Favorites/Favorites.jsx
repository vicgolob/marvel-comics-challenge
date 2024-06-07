import IconHeartRed from '@/assets/icon-heart-red.svg';
import IconHeartWhite from '@/assets/icon-heart-white.svg';

import './Favorites.scss';

function Favorites({ count }) {
  return (
    <div className="favorite-container">
      <img
        id="favorite-icon"
        src={count === 0 ? IconHeartWhite : IconHeartRed}
        role="presentation"
        alt={count === 0 ? 'no favorites yet' : `${count} favorites`}
      />
      <span>{count}</span>
    </div>
  );
}

export default Favorites;

Favorites.propTypes = {
  count: Number,
};
