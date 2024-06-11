import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Favorites } from '@/components/index.js';
import Logo from 'public/logo.svg';
import { Context } from '@/context/CharactersContext';

import './Header.scss';

function Header() {
  const { favoriteCount, isFilterActive, toggleIsFilterActive } =
    useContext(Context);

  function resetFavoritesFilter() {
    isFilterActive && toggleIsFilterActive();
  }
  return (
    <header>
      <Link to="/" onClick={resetFavoritesFilter}>
        <img src={Logo} role="presentation" />
      </Link>
      <Favorites count={favoriteCount} />
    </header>
  );
}

export default Header;
