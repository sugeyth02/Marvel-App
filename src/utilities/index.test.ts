import { debounce } from './debounce';
import { range } from './range';

//range
test('Range should return an array with the start at the first position and end at the last position', () => {
  const start = 5,
    end = 10;
  const response = range(start, end);

  expect(response).toHaveLength(end - start + 1);
  expect(response[0]).toEqual(start);
  expect(response[response.length - 1]).toEqual(end);
});

test('Range should return an array with one index when the start is equal to end', () => {
  const start = 5;
  const response = range(start, start);

  expect(response).toHaveLength(1);
  expect(response[0]).toEqual(start);
});

//Debounce
jest.useFakeTimers();

describe('debounce', () => {
  let func: jest.Mock;
  let debouncedFunc: Function;

  beforeEach(() => {
     func = jest.fn();
     debouncedFunc = debounce(func, 1000);
  });

  test('Debounce should execute just once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }
      
    // Fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});
