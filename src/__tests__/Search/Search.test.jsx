import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Search from '@/components/Search/Search.jsx';

const mockOnSearch = vi.fn();

describe('Search', () => {
  it('should update search term when user types in the input field', () => {
    render(<Search resultsCount={0} onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('SEARCH CHARACTER');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should call onSearch with search term', async () => {
    render(<Search resultsCount={0} onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('SEARCH CHARACTER');

    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
  });
});
