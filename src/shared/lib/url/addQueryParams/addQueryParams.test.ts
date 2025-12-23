import { expect } from '@jest/globals';
import { getQueryParams } from './addQueryParams';

import '@testing-library/jest-dom';

describe('shared/url/addQueryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    });
    expect(params).toBe('?test=value');
  });
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
      second: '2',
    });
    expect(params).toBe('?test=value&second=2');
  });
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
      second: undefined,
    });
    expect(params).toBe('?test=value');
  });
});
