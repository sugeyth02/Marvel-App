import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { usePagination } from './usePagination';

describe('Testing use pagination', () => {
  function TestComponent() {
    const [page, setPage] = useState(1);
    const { forward, backward } = usePagination({
      setPage,
      currentPage: page,
      totalItems: 200,
      itemsperPage: 24,
    });
    return (
      <div>
        <span>{page}</span>
        <button
          onClick={() => {
            forward();
          }}
        >
          forward
        </button>
        <button
          onClick={() => {
            backward();
          }}
        >
          backward
        </button>
      </div>
    );
  }
  const renderComponent = () => {
    render(<TestComponent />);
  };

  test('should forward', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.queryByText('1')).toBeInTheDocument();
    });
    const forward = screen.getByText('forward');
    userEvent.click(forward);

    await waitFor(() => {
      expect(screen.queryByText('2')).toBeInTheDocument();
    });
  });

  test('should backguard', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.queryByText('1')).toBeInTheDocument();
    });
    const forward = screen.getByText('forward');
    userEvent.click(forward);

    await waitFor(() => {
      expect(screen.queryByText('2')).toBeInTheDocument();
    });

    const backward = screen.getByText('backward');
    userEvent.click(backward);

    await waitFor(() => {
      expect(screen.queryByText('1')).toBeInTheDocument();
    });
  });
});
