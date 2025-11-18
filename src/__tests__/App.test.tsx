import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders the heading', () => {
    render(<App />);
    const heading = screen.getByText(/Welcome to Vite React App/i);
    expect(heading).toBeInTheDocument();
  });
});
