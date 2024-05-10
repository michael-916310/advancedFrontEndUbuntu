import { LoginSchema } from 'features/AuthByUsername';
import { DeepPartial } from 'shared/types';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('user')),
    ).toEqual({ username: 'user' });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('user')),
    ).toEqual({ password: 'user' });
  });
});
