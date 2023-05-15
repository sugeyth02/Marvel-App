/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import './mock/server';
import userEvent from '@testing-library/user-event';
import Router from '../../components/Router';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Testing Character detail  view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const renderComponent = (characterId: number) =>
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/characters', `/characters/${characterId}`]}
        >
          <Router />
        </MemoryRouter>
      </Provider>
    );

  test('should render the character details', async () => {
    // Render
    renderComponent(1009149);
    // Assertions
    await waitFor(
      () => {
        expect(screen.queryByText('Abyss')).toBeInTheDocument();
        expect(
          screen.queryByText('2014-04-29T14:10:43-0400')
        ).toBeInTheDocument();
        expect(
          screen.queryByText('Uncanny X-Men (1963) #402')
        ).toBeInTheDocument();
        expect(screen.queryByText('A Beginning')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  test('should go back to previous page (Character List)', async () => {
    renderComponent(1009149);
    const icon = document.querySelector('.fa-circle-arrow-left') as Element;
    userEvent.click(icon);
    await waitFor(() => {
      expect(screen.queryByText(/MARVEL CHARACTERS LIST/i)).toBeInTheDocument();
      expect(screen.queryByText(/3-D Man/i)).toBeInTheDocument();
      expect(screen.queryByText(/Alain/i)).toBeInTheDocument();
    });
  });
});
