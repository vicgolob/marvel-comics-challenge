import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { CharacterCard } from '@/components/index.js';
import { Context } from '@/context/CharactersContext.jsx';

describe('CharacterCard', () => {
  function SetupCharacterCardComponent(isFavorite = false, contextValue = {}) {
    const defaultContextValue = {
      removeFromFavorite: vi.fn(),
      addToFavorite: vi.fn(),
      ...contextValue,
    };

    return (
      <MemoryRouter>
        <Context.Provider value={defaultContextValue}>
          <CharacterCard
            id={1}
            name="john doe"
            image="image.jpg"
            isFavorite={isFavorite}
          />
        </Context.Provider>
      </MemoryRouter>
    );
  }

  it('should render character name in uppercase', () => {
    const { getByText } = render(SetupCharacterCardComponent());
    const characterName = getByText('JOHN DOE');
    expect(characterName).toBeInTheDocument();
  });

  it('should display character image with class "character-image"', () => {
    render(SetupCharacterCardComponent());
    const characterImageWithClass = screen.getByRole('presentation');
    expect(characterImageWithClass).toHaveClass('character-image');
  });

  it('should show red heart icon when isFavorite is true', () => {
    const { getByTestId } = render(SetupCharacterCardComponent(true));
    const redHeartIcon = getByTestId('red-heart-icon');
    expect(redHeartIcon).toBeInTheDocument();
  });

  it('should call removeFromFavorite when favorite button is clicked and character is favorite', () => {
    const removeFromFavoriteMock = vi.fn();

    render(
      SetupCharacterCardComponent(true, {
        removeFromFavorite: removeFromFavoriteMock,
      })
    );

    fireEvent.click(screen.getByRole('button'));

    expect(removeFromFavoriteMock).toHaveBeenCalledWith(1);
  });

  it('should call addToFavorite when favorite button is clicked and character is not favorite', () => {
    const addToFavoriteMock = vi.fn();

    render(
      SetupCharacterCardComponent(false, {
        addToFavorite: addToFavoriteMock,
      })
    );

    fireEvent.click(screen.getByRole('button'));

    expect(addToFavoriteMock).toHaveBeenCalledWith({
      id: 1,
      name: 'john doe',
      image: 'image.jpg',
      isFavorite: true,
    });
  });
});
