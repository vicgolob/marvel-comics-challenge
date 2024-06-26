import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Characters } from '@/pages/index.js';
import { Context } from '@/context/CharactersContext.jsx';

vi.mock('@/components/ProgressBar/ProgressBar.jsx', () => {
  const ProgressBar = () => <div data-testid="progressBar-component" />;
  return { default: ProgressBar };
});

vi.mock('@/components/CharacterCard/CharacterCard.jsx', () => {
  const CharacterCard = () => <div data-testid="characterCard-component" />;
  return { default: CharacterCard };
});

vi.mock('@/api/charactersApi.js', async () => {
  const actual = await vi.importActual('@/api/charactersApi.js');
  return {
    ...actual,
    getCharacters: vi.fn().mockResolvedValue({
      results: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        name: '3-D Man',
        description: '',
        thumbnail: {
          path: 'http://some_path.com',
          extension: 'jpg',
        },
      })),
    }),
  };
});

describe('Characters', () => {
  function SetupCharactersPage() {
    return (
      <MemoryRouter>
        <Context.Provider
          value={{
            removeFromFavorite: vi.fn(),
            addToFavorite: vi.fn(),
            isFavoriteCharacter: vi.fn(),
          }}
        >
          <Characters />
        </Context.Provider>
      </MemoryRouter>
    );
  }
  it('should render without crashing', () => {
    const { container } = render(SetupCharactersPage());
    expect(container).toBeInTheDocument();
  });

  it('should render ProgressBar initially', () => {
    const { getByTestId } = render(SetupCharactersPage());

    expect(getByTestId('progressBar-component')).toBeInTheDocument();
  });

  it('should fetch characters list on mount', async () => {
    const { getAllByTestId } = render(SetupCharactersPage());

    await vi.waitFor(() => {
      expect(getAllByTestId('characterCard-component')).toHaveLength(10);
    });
  });
});
