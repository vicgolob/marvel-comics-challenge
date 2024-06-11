import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CharacterCard } from '@/components/index.js';
import { Context } from '@/context/CharactersContext.jsx';

describe('CharacterCard', () => {
  function SetupCharacterCardComponent(isFavorite = false) {
    return (
      <MemoryRouter>
        <Context.Provider
          value={{
            removeFromFavorite: vi.fn(),
            addToFavorite: vi.fn(),
          }}
        >
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
    const addToFavoriteMock = vi.fn();

    const contextValue = {
      removeFromFavorite: removeFromFavoriteMock,
      addToFavorite: addToFavoriteMock,
    };

    const { getByRole } = render(
      <MemoryRouter>
        <Context.Provider value={contextValue}>
          <CharacterCard
            id={1}
            name="Test Character"
            image="test.jpg"
            isFavorite={true}
          />
        </Context.Provider>
      </MemoryRouter>
    );

    fireEvent.click(getByRole('button'));

    expect(removeFromFavoriteMock).toHaveBeenCalledWith(1);
  });
});
