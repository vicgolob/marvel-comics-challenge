import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Favorites from '@/components/Favorites/Favorites';

describe('Favorites', () => {
  it('should render red heart icon when count is greater than 0', () => {
    const { getByAltText } = render(<Favorites count={5} />);
    const icon = getByAltText('5 favorites');
    expect(icon).toBeInTheDocument();
  });

  it('should render empty heart icon when count is 0', () => {
    const { getByAltText } = render(<Favorites count={0} />);
    const icon = getByAltText('no favorites yet');
    expect(icon).toBeInTheDocument();
  });
});
