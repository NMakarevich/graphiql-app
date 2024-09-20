import { render } from '@testing-library/react';
import HistoryListItem from '@components/historyListItem/historyListItem.tsx';
import { HistoryItem } from '@components/historyList/types.ts';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods.ts';

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/ru/';
  },
}));

describe('historyListItem', () => {
  it('renders correctly', () => {
    const item: HistoryItem = {
      source: RESTful_METHODS.GET,
      executedAt: 1726515723931,
      baseUrl: 'https://jsonplaceholder.typicode.com/todos/1',
      url: '/GET/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLzE=',
    };
    const { container } = render(<HistoryListItem item={item} />);
    expect(container).toBeInTheDocument();
  });
});
