import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacterCard } from '@/components/index.js';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterCard', () => {
  it('should render character name in uppercase', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CharacterCard name="john doe" image="image.jpg" />
      </MemoryRouter>
    );
    const characterName = getByText('JOHN DOE');
    expect(characterName).toBeInTheDocument();
  });

  it('should display character image with class "character-image"', () => {
    render(
      <MemoryRouter>
        <CharacterCard name="John Doe" image="image.jpg" />
      </MemoryRouter>
    );
    const characterImageWithClass = screen.getByRole('presentation');
    expect(characterImageWithClass).toHaveClass('character-image');
  });

  it('should show red heart icon when isFavorite is true', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CharacterCard name="John Doe" image="image.jpg" isFavorite={true} />
      </MemoryRouter>
    );
    const redHeartIcon = getByTestId('red-heart-icon');
    expect(redHeartIcon).toBeInTheDocument();
  });
});
