import { TestAsyncThank } from '@/shared/lib/tests/TestAsyncThank/TestAsyncThank';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { fetchProfileData } from './fetchProfileData';

const data = {
  username: 'michael buranov',
  age: 23,
  country: Country.Russia,
  currency: Currency.RUB,
  city: 'Soshi',
  first: 'michael',
  lastname: 'buranov',
};

describe('./fetchProfileData.test', () => {
  test('Success', async () => {
    const thunk = new TestAsyncThank(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('Failed', async () => {
    const thunk = new TestAsyncThank(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
