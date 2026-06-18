import { act, render } from '@testing-library/react';
import HistoryList from '@components/historyList/historyList.tsx';

describe('historyList', () => {
  it('- renders without crashing.', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<HistoryList />);
    });
  });
});
