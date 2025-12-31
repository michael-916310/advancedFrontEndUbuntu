import { expect } from '@jest/globals';
import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/app/types/types';
import { getCounterValue } from './getCounterValue';

import '@testing-library/jest-dom';

describe('getCounterValue.test', () => {
    test('', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };

        expect(getCounterValue(state as StateSchema)).toEqual(10);
    });
});
