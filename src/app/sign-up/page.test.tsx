import { act, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import SignUp from './page';

describe('SignUp: ', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<SignUp />);
    });
  });
});
