import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import { Characters } from '@/pages/index.js';

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
    getCharacters: vi.fn().mockResolvedValue(
      Array.from({ length: 10 }, () => ({
        id: Math.random(),
        name: '3-D Man',
        description: '',
        thumbnail: {
          path: 'http://some_path.com',
          extension: 'jpg',
        },
      }))
    ),
  };
});

describe('Characters', () => {
  it('should render without crashing', () => {
    const { container } = render(<Characters />);
    expect(container).toBeInTheDocument();
  });

  it('should render ProgressBar initially', () => {
    const { getByTestId } = render(<Characters />);

    expect(getByTestId('progressBar-component')).toBeInTheDocument();
  });

  it('should fetch characters list on mount', async () => {
    const { getAllByTestId } = render(<Characters />);

    await vi.waitFor(() => {
      expect(getAllByTestId('characterCard-component')).toHaveLength(10);
    });
  });
});
