import { TestAsyncThank } from 'shared/lib/tests/TestAsyncThank/TestAsyncThank';
import { loginByUserName } from 'features/AuthByUsername/model/services/loginByUserName/loginByUserName';
import { userActions } from 'entities/User';

// jest.mock('axios');
// const mockAxios = jest.mocked(axios, { shallow: false });

describe('./loginByUserName.test', () => {
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;
  //
  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });
  // test('Success login', async () => {
  //   const userValue = {
  //     username: '123',
  //     id: '1',
  //   };
  //
  //   mockAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
  //   const action = loginByUserName({
  //     username: '123',
  //     password: '123',
  //   });
  //   const result = await action(dispatch, getState, undefined);
  //
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //   expect(dispatch).toHaveBeenCalledTimes(3);
  //   expect(mockAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe('fulfilled');
  //   expect(result.payload).toEqual(userValue);
  // });
  // test('Failed login', async () => {
  //   mockAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
  //   const action = loginByUserName({
  //     username: '123',
  //     password: '123',
  //   });
  //   const result = await action(dispatch, getState, undefined);
  //
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(mockAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toBe('error');
  // });

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
