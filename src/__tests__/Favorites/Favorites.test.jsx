import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Favorites from '@/components/Favorites/Favorites';
import CharactersContextProvider from '@/context/CharactersContext.jsx';

describe('Favorites', () => {
  function SetupFavoritesComponent(count = 0) {
    return (
      <MemoryRouter>
        <CharactersContextProvider>
          <Favorites count={count} />
        </CharactersContextProvider>
      </MemoryRouter>
    );
  }

  it('should render red heart icon when count is greater than 0', () => {
    const { getByAltText } = render(SetupFavoritesComponent(5));
    const icon = getByAltText('5 favorites');
    expect(icon).toBeInTheDocument();
  });

  it('should render empty heart icon when count is 0', () => {
    const { getByAltText } = render(SetupFavoritesComponent(0));
    const icon = getByAltText('no favorites yet');
    expect(icon).toBeInTheDocument();
  });
});
