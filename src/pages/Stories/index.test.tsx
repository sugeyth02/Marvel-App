import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './../../redux/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import './mocks/server';
import Stories from '.';

describe('Testing Stories list view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('should renders a list of stories initially', async () => {
    // Render
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Stories />
        </BrowserRouter>
      </Provider>
    );

    // Assertions
    await waitFor(
      () => {
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
        expect(container).toMatchSnapshot();
      },
      { timeout: 3000 }
    );

    const characters = await screen.findByLabelText(/Characters:/i);
    userEvent.click(characters);

    await waitFor(() => {
      expect(screen.queryByText('3-D Man')).toBeInTheDocument();
      expect(screen.queryByText('Beak')).toBeInTheDocument();
    });
  });
});
