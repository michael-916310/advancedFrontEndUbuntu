import { expect } from '@jest/globals';
import { DeepPartial } from '@/app/types/types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileData } from './getProfileData';
import '@testing-library/jest-dom';

describe('getProfileData.test', () => {
  test('should return data', () => {
    const data = {
      username: 'michael buranov',
      age: 23,
      country: Country.Russia,
      currency: Currency.RUB,
      city: 'Soshi',
      first: 'michael',
      lastname: 'buranov',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
