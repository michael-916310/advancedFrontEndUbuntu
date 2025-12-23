import { expect } from '@jest/globals';
import { CounterSchema } from '../type/counterSchema';
import { counterActions, counterReducer } from './counterSlice';

import '@testing-library/jest-dom';

describe('conterSlice.test', () => {
  test('decrement', () => {
    const state: CounterSchema = { value: 10 };

    expect(counterReducer(state, counterActions.decrement())).toEqual({
      value: 9,
    });
  });

  test('increment', () => {
    const state: CounterSchema = { value: 10 };

    expect(counterReducer(state, counterActions.increment())).toEqual({
      value: 11,
    });
  });

  test('empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({
      value: 1,
    });
  });
});
