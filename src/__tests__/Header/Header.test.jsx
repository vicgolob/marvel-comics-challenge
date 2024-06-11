import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '@/components/Header/Header';
import CharactersContextProvider from '@/context/CharactersContext.jsx';

vi.mock('@/components/Favorites/Favorites.jsx', () => {
  const Favorites = () => <div data-testid="favorites-component" />;
  return { default: Favorites };
});

describe('Header', () => {
  function SetupHeaderComponent() {
    return (
      <MemoryRouter>
        <CharactersContextProvider>
          <Header />
        </CharactersContextProvider>
      </MemoryRouter>
    );
  }

  it('should render a header element', () => {
    const { container } = render(<SetupHeaderComponent />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should have a logo image', () => {
    const { getByRole } = render(<SetupHeaderComponent />);
    const logoImage = getByRole('presentation');
    expect(logoImage).toHaveAttribute('src', '/public/logo.svg');
  });

  it('should contain a Link component pointing to the home route', () => {
    const { getByRole } = render(<SetupHeaderComponent />);
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should include the Favorites component', () => {
    const { getByTestId } = render(<SetupHeaderComponent />);
    const favoritesComponent = getByTestId('favorites-component');
    expect(favoritesComponent).toBeInTheDocument();
  });
});
