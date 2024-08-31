import { act, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import SignIn from './page';

describe('SignIn: ', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<SignIn />);
    });
  });
});
