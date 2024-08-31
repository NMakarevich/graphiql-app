import { render, screen } from '@testing-library/react';
import Custom404 from './not-found';
import { ROUTES } from '@/utils/constants/routes';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('Custom404:', () => {
  it('- renders the 404 title.', () => {
    render(<Custom404 />);
    const titleElement = screen.getByText(/404/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('- renders the description text.', () => {
    render(<Custom404 />);
    const descriptionElement = screen.getByText(
      /Correct the address and repeat or start from the main one/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it('- renders a button with a link to the Home page.', () => {
    render(<Custom404 />);
    const linkElement = screen.getByRole('link', { name: /Go to Home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', ROUTES.HOME_PATH);
  });
});
