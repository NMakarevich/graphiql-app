import { act, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import GraphiQL from './page';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams() {
    const params = new URLSearchParams();
    params.set('key', 'value');
    return params;
  },
  usePathname: vi.fn(),
}));

describe('GraphiQL: ', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(
        <GraphiQL
          params={{
            data: [],
          }}
        />
      );
    });
  });
});
