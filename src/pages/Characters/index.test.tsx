import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { store } from './../../redux/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import './mock/server';
import Router from '../../components/Router';

describe('Testing Characters list view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/characters']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

  test('should renders a list of characters initially', async () => {
    // Render
    const { container } = renderComponent();

    // Assertions
    await waitFor(
      () => {
        expect(screen.queryByText('3-D Man')).toBeInTheDocument();
        expect(screen.queryByText('Alain')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      },
      { timeout: 3000 }
    );

    const comics = await screen.findByLabelText(/Comics:/i);
    userEvent.click(comics);

    await waitFor(() => {
      expect(
        screen.queryByText(
          'DEADPOOL VOL. 7: SPACE ODDITY PREMIERE HC (Trade Paperback)'
        )
      ).toBeInTheDocument();
      expect(screen.queryByText('Shame Itself (2011) #1')).toBeInTheDocument();
    });

    const stories = await screen.findByLabelText(/Stories:/i);
    userEvent.click(stories);

    await waitFor(() => {
      expect(screen.queryByText('Cover #602')).toBeInTheDocument();
      expect(screen.queryByText('1 of 5 - Golgotha')).toBeInTheDocument();
    });
  });

  test('should search a character', async () => {
    renderComponent();
    await screen.findByText('3-D Man');
    const searchBar = screen.getByPlaceholderText(/SEARCH/i);

    //fireEvent.change(searchBar, { target: { value: 'MARVEL' } });
    userEvent.type(searchBar, 'MARVEL');

    await waitFor(
      () => {
        expect(screen.queryByText('Marvel Apes')).toBeInTheDocument();
        expect(screen.queryByText('Marvel Boy')).toBeInTheDocument();
        expect(screen.queryByText('Marvel Zombies')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    userEvent.type(searchBar, '{backspace}{backspace}{backspace}{backspace}');

    await waitFor(
      () => {
        expect(screen.queryByText('Marvel Apes')).toBeNull();
        expect(screen.queryByText('Marvel Boy')).toBeNull();
        expect(screen.queryByText('Marvel Zombies')).toBeNull();
        expect(screen.queryByText('3-D Man')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
