import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import IconHeartRed from '@/assets/icon-heart-red.svg';
import IconHeartWhite from '@/assets/icon-heart-white.svg';
import { Context } from '@/context/CharactersContext';

import './Favorites.scss';

function Favorites({ count }) {
  const navigate = useNavigate();
  const { isFilterActive, toggleIsFilterActive, shouldResetSearch } =
    useContext(Context);

  function handleFavoritesClick() {
    if (!isFilterActive) {
      shouldResetSearch.current = true;
      toggleIsFilterActive();
    }
    if (window.location.pathname !== '/') {
      return navigate('/');
    }
  }

  return (
    <button className="favorite-container" onClick={handleFavoritesClick}>
      <img
        id="favorite-icon"
        src={count === 0 ? IconHeartWhite : IconHeartRed}
        role="presentation"
        alt={count === 0 ? 'no favorites yet' : `${count} favorites`}
      />
      <span>{count}</span>
    </button>
  );
}

export default Favorites;

Favorites.propTypes = {
  count: Number,
};
