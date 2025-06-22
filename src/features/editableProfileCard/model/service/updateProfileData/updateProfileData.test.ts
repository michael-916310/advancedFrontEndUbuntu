import { TestAsyncThank } from 'shared/lib/tests/TestAsyncThank/TestAsyncThank';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { ValidationProfileError } from '../../types/editableProfileCardSchema';
import { updateProfileData } from './updateProfileData';

const data = {
  username: 'michael buranov',
  age: 23,
  country: Country.Russia,
  currency: Currency.RUB,
  city: 'Soshi',
  first: 'michael',
  lastname: 'buranov',
};

describe('./updateProfileData.test', () => {
  test('Success', async () => {
    const thunk = new TestAsyncThank(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('Server error', async () => {
    const thunk = new TestAsyncThank(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidationProfileError.SERVER_ERROR]);
  });

  test('Validate error', async () => {
    const thunk = new TestAsyncThank(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' },
      },
    });
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidationProfileError.INCORRECT_USER_DATA]);
  });
});
