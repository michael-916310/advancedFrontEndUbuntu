import { expect } from '@jest/globals';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/app/types/types';
import { getLoginIsLoading } from './getLoginIsLoading';

import '@testing-library/jest-dom';

describe('getLoginIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
    });
});
