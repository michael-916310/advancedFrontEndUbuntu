import { expect } from '@jest/globals';
import { TestAsyncThank } from '@/shared/lib/tests/TestAsyncThank/TestAsyncThank';
import { userActions } from '@/entities/User';
import { loginByUserName } from './loginByUserName';

import '@testing-library/jest-dom';

// jest.mock('axios');
// const mockAxios = jest.mocked(axios, { shallow: false });

describe('./loginByUserName.test', () => {
  test('Success login', async () => {
    const userValue = {
      username: '123',
      id: '1',
    };

    const thunk = new TestAsyncThank(loginByUserName);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({
      username: '123',
      password: '123',
    });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue),
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('Failed login', async () => {
    const thunk = new TestAsyncThank(loginByUserName);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({
      username: '123',
      password: '123',
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
