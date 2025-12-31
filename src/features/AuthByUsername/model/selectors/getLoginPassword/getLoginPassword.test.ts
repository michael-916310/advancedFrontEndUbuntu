import { expect } from '@jest/globals';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/app/types/types';
import { getLoginPassword } from './getLoginPassword';

import '@testing-library/jest-dom';

describe('getLoginPassword.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: 'password',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('password');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
