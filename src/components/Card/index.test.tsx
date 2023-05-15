/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { store } from '../../redux/store';
import Card from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Testing Pokemon Detail view', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchMock.mockClear();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/characters']}>
          <Routes>
            <Route
              path='/characters'
              element={
                <Card
                  page='characters'
                  info={{
                    img: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
                    title: '3-D Man',
                    id: 1011334,
                  }}
                />
              }
            ></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  test('should render the card', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.queryByText('3-D Man')).toBeInTheDocument();
      const icon = document.querySelector('.fa-bookmark');
      expect(icon).toBeInTheDocument();
    });
  });
    
    test('should add bookmark', () => {
        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);
        expect(dummyDispatch).not.toHaveBeenCalled();

         renderComponent();
        
        const button = screen.getByTestId('bookmark');
        userEvent.click(button);

         expect(dummyDispatch).toHaveBeenCalled();

    });
});
