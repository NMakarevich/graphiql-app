import { act, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import History from './page';

describe('History: ', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<History />);
    });
  });
});
