import { DeepPartial } from 'app/types/types';
import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidationProfileError } from '../../types/profile';

describe('getProfileValidateErrors.test', () => {
  test('should return error', () => {
    const errors = [ValidationProfileError.NO_DATA];
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: errors,
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
