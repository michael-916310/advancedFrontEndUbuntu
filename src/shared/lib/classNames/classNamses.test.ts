// import { classNames } from './classNames';
import { classNames } from './classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });

  test('with additional class', () => {
    const result = 'someClass class1';
    expect(classNames('someClass', {}, ['class1'])).toBe(result);
  });

  test('with additional true class', () => {
    const result = 'someClass class1 modClass1';
    expect(classNames('someClass', { modClass1: true }, ['class1']))
      .toBe(result);
  });

  test('with additional false class', () => {
    const result = 'someClass class1';
    expect(classNames('someClass', { modClass1: false }, ['class1']))
      .toBe(result);
  });

  test('with additional false undefined', () => {
    const result = 'someClass class1';
    expect(classNames('someClass', { modClass1: undefined }, ['class1']))
      .toBe(result);
  });
});
