import { DeepPartial } from 'app/types/types';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from '../service/updateProfileData/updateProfileData';
import { ProfileSchema, ValidationProfileError } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';

const data = {
  username: 'michael buranov',
  age: 23,
  country: Country.Russia,
  currency: Currency.RUB,
  city: 'Soshi',
  first: 'michael',
  lastname: 'buranov',
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadOnly(true)),
    ).toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {};
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({
      readonly: true,
      form: state.data,
      validateError: undefined,
    });
  });

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = {};
    expect(
      profileReducer(state as ProfileSchema, profileActions.updateProfile({
        username: 'test',
        age: 20,
      })),
    ).toEqual({
      form: {
        username: 'test',
        age: 20,
      },
    });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidationProfileError.SERVER_ERROR],
    };

    // @ts-ignore
    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
      isLoading: true,
      validateError: undefined,
    });
  });

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
    )).toEqual({
      isLoading: false,
      readonly: true,
      validateError: undefined,
      form: data,
      data,
    });
  });
});
