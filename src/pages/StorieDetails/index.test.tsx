/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import './mock/server';
import userEvent from '@testing-library/user-event';
import Router from '../../components/Router';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Testing Stories detail  view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const renderComponent = (storyId: number) =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stories', `/stories/${storyId}`]}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

  test('should render the stories details', async () => {
    // Render
    renderComponent(11);
    // Assertions
    await waitFor(() => {
      expect(screen.queryByText('Interior #11')).toBeInTheDocument();
      expect(screen.queryByText('story')).toBeInTheDocument();
      expect(
        screen.queryByText('1969-12-31T19:00:00-0500')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Captain Britain Vol. I (Trade Paperback)')
      ).toBeInTheDocument();
    });
  });

  test('should go back to previous page (Stories List)', async () => {
    renderComponent(11);
    const icon = document.querySelector('.fa-circle-arrow-left') as Element;
    userEvent.click(icon);
    await waitFor(() => {
      expect(screen.queryByText(/MARVEL STORIES LIST/i)).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Investigating the murder of a teenage girl, Cage suddenly learns that a three-way gang war is under way for control of the turf'
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Ever-expanding their ranks, the Children of the Atom combat the evils threatening both mutants and humans Ñ like the Brotherhood'
        )
      ).toBeInTheDocument();
    });
  });
});
