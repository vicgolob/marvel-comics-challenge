/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Search from '@/components/Search/Search.jsx';
import CharactersContextProvider from '@/context/CharactersContext.jsx';

const mockOnSearch = vi.fn();

const SetupSearchComponent = ({
  resultsCount = 0,
  onSearch = mockOnSearch,
}) => (
  <CharactersContextProvider>
    <Search resultsCount={resultsCount} onSearch={onSearch} />
  </CharactersContextProvider>
);

describe('Search', () => {
  it('should update search term when user types in the input field', () => {
    render(<SetupSearchComponent />);

    const input = screen.getByPlaceholderText('SEARCH CHARACTER');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should call onSearch with search term', async () => {
    render(<SetupSearchComponent />);

    const input = screen.getByPlaceholderText('SEARCH CHARACTER');

    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
  });
});
