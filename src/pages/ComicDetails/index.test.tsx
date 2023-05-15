/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import './mock/server';
import userEvent from '@testing-library/user-event';
import Router from '../../components/Router';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Testing Comics detail  view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const renderComponent = (comicId: number) =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/comics', `/comics/${comicId}`]}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

  test('should render the comic details', async () => {
    // Render
    renderComponent(1886);
    // Assertions
    await waitFor(
      () => {
        expect(
          screen.queryByText(
            'Official Handbook of the Marvel Universe (2004) #12 (SPIDER-MAN)'
          )
        ).toBeInTheDocument();
        expect(screen.queryByText('SPIDER-MAN')).toBeInTheDocument();
        expect(
          screen.queryByText('-0001-11-30T00:00:00-0500')
        ).toBeInTheDocument();
        expect(screen.queryByText('Apocalypse')).toBeInTheDocument();
        expect(screen.queryByText('Cover #4430')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
  test('should go back to previous page (Comics List)', async () => {
    renderComponent(1886);
    const icon = document.querySelector('.fa-circle-arrow-left') as Element;
    userEvent.click(icon);
    await waitFor(() => {
      expect(screen.queryByText(/MARVEL COMICS LIST/i)).toBeInTheDocument();
      expect(screen.queryByText('Marvel Previews (2017)')).toBeInTheDocument();
      expect(screen.queryByText('Ant-Man (2003) #3')).toBeInTheDocument();
    });
  });
});
