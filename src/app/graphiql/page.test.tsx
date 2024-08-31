import { act, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import GraphiQL from './page';

describe('GraphiQL: ', (): void => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<GraphiQL />);
    });
  });
});
