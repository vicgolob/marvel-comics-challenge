import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  // renders without crashing
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  // renders "App is running!" text
  it('should render the correct heading text', () => {
    const { getByText } = render(<App />);
    const headingElement = getByText('App is running!');
    expect(headingElement).toBeInTheDocument();
  });
});
