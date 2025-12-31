import { expect } from '@jest/globals';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/app/types/types';
import { getLoginError } from './getLoginError';

import '@testing-library/jest-dom';

describe('getLoginError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error',
            },
        };
        expect(getLoginError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
