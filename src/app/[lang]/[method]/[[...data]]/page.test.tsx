import { act, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import RESTfullClient from './page.tsx';

describe('RESTfullClient: ', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<RESTfullClient params={{ method: 'GET' }} />);
    });
  });
});
