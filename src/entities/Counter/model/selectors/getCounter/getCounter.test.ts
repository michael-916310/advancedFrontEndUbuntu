import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'app/types/types';
import { getCounter } from './getCounter';

describe('getCounter', () => {
  test('should return counter number', () => {
    const state: DeepPartial<StateSchema> = {
      counter: { value: 10 },
    };
    expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
  });
});
