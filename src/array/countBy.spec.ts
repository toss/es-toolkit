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

  it('should count keys that exist on Object.prototype', () => {
    // A plain object inherits from `Object.prototype`, so reading `result[key]` for a key such as
    // `constructor` finds the inherited function instead of `undefined`. `??` lets it through and
    // `function + 1` becomes a string.
    expect(countBy(['constructor', 'constructor'], x => x)).toEqual({ constructor: 2 });
    expect(countBy(['toString', 'valueOf', 'toString'], x => x)).toEqual({ toString: 2, valueOf: 1 });
    expect(countBy(['hasOwnProperty'], x => x)).toEqual({ hasOwnProperty: 1 });
  });

  it('should count the `__proto__` key', () => {
    // `__proto__` is an accessor on `Object.prototype`, so assigning to it on a plain object calls
    // the setter instead of creating an own property.
    const result = countBy(['__proto__', '__proto__'], x => x);

    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result['__proto__' as keyof typeof result]).toBe(2);
  });

  it('should return an object that inherits from Object.prototype', () => {
    const result = countBy(['a'], x => x);

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
  });
});
