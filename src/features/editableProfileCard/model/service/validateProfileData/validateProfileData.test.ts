import { expect } from '@jest/globals';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { validateProfileData } from './validateProfileData';

import { ValidationProfileError } from '../../../model/consts/consts';

import '@testing-library/jest-dom';

const data = {
  username: 'michael buranov',
  age: 23,
  country: Country.Russia,
  currency: Currency.RUB,
  city: 'Soshi',
  first: 'michael',
  lastname: 'buranov',
};

describe('./validateProfileData.test', () => {
  test('Success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' });

    expect(result).toEqual([ValidationProfileError.INCORRECT_USER_DATA]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidationProfileError.INCORRECT_AGE]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidationProfileError.INCORRECT_COUNTRY]);
  });

  test('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidationProfileError.INCORRECT_USER_DATA,
      ValidationProfileError.INCORRECT_AGE,
      ValidationProfileError.INCORRECT_COUNTRY,

    ]);
  });
});
