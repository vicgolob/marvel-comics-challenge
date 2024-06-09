import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ProgressBar } from '@/components/index.js';

describe('ProgressBar', () => {
  it('should render without crashing', () => {
    const { container } = render(<ProgressBar />);
    expect(container).toBeInTheDocument();
  });
});
