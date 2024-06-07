import { Link } from 'react-router-dom';

import { Favorites } from '@/components/index.js';
import Logo from 'public/logo.svg';

import './Header.scss';

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={Logo} role="presentation" />
      </Link>
      <Favorites count={0} />
    </header>
  );
}

export default Header;
