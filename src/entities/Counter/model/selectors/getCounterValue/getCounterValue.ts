import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { buildSelector } from '@/shared/lib/store';

export const getCounterValue = createSelector(
    getCounter,
    (counter) => counter.value,
);

export const [useCounterValue, getCounterValueSelector] = buildSelector(
    (state) => state.counter.value,
);
