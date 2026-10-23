import { describe, expect, it } from 'vitest';
import { countBy } from './countBy.ts';

describe('countBy', () => {
  it('should count the occurrences of each item in an array', () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result = countBy(arr, String);

    expect(result).toEqual({
      '1': 2,
      '2': 2,
      '3': 2,
      '4': 2,
      '5': 2,
    });
  });
  it('should count the occurrences of each item in an array that applied transformer', () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result = countBy(arr, item => (item % 2 === 0 ? 'even' : 'odd'));

    expect(result).toEqual({
      odd: 6,
      even: 4,
    });
  });

  it('should pass index to mapper function', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const result = countBy(arr, (item, index) => (index < 2 ? 'first' : 'rest'));

    expect(result).toEqual({
      first: 2,
      rest: 2,
    });
  });

  it('should pass array to mapper function', () => {
    const arr = [1, 2, 3, 4];
    const result = countBy(arr, (item, index, array) => (item < array.length / 2 ? 'small' : 'large'));

    expect(result).toEqual({
      small: 1,
      large: 3,
    });
  });

  it('should preserve own __proto__ key without setting the prototype', () => {
    const result = countBy(
      [{ k: '__proto__' }, { k: '__proto__' }, { k: 'ok' }],
      item => item.k
    );

    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Array.isArray(Object.getPrototypeOf(result))).toBe(false);
    expect(Object.keys(result)).toEqual(['__proto__', 'ok']);
    expect(result['__proto__']).toBe(2);
    expect(result.ok).toBe(1);
  });

});
