import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './page';
import { ReactNode } from 'react';
import RootLayout from './layout';

vi.mock('next/font/google', () => ({
  Montserrat: () => ({
    style: { fontFamily: 'Montserrat, sans-serif' },
    className: 'montserrat-mock',
  }),
}));

vi.mock('next/navigation', async () => ({
  useRouter: vi.fn(),
}));

describe('Home:', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<Home />);
    });
  });
});

describe('RootLayout:', (): void => {
  it('- renders without crashing.', () => {
    const children: ReactNode = <div>Test Content</div>;
    render(<RootLayout params={{ lang: 'ru' }}>{children}</RootLayout>);
  });

  it('- renders without crashing.', (): void => {
    const children: ReactNode = <div>Test Content</div>;
    const { container } = render(
      <RootLayout params={{ lang: 'ru' }}>{children}</RootLayout>
    );
    expect(container).toBeInTheDocument();
  });
});
