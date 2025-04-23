import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'app/types/types';
import { getLoginUserName } from './getLoginUserName';

describe('getLoginUserName.test', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'user',
      },
    };
    expect(getLoginUserName(state as StateSchema)).toEqual('user');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUserName(state as StateSchema)).toEqual('');
  });
});
