import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './../../redux/store';
import { Provider } from 'react-redux';
import './mocks/server';
import Comics from '.';

describe('Testing Comics list view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('should renders a list of comics initially', async () => {
    // Render
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Comics />
        </BrowserRouter>
      </Provider>
    );

    // Assertions
    await waitFor(
      () => {
        expect(
          screen.queryByText('Marvel Previews (2017)')
        ).toBeInTheDocument();
        expect(screen.queryByText('Ant-Man (2003) #3')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      },
      { timeout: 3000 }
    );
  });
});
