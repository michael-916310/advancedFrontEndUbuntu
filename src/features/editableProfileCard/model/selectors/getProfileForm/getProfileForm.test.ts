import { expect } from '@jest/globals';
import { DeepPartial } from '@/app/types/types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileForm } from './getProfileForm';

import '@testing-library/jest-dom';

describe('getProfileForm.test', () => {
    test('should return form', () => {
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
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
