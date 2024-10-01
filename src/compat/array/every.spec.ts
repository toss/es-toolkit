import { describe, expect, it } from 'vitest';
import { every } from './every';
import { empties } from '../_internal/empties';
import { identity } from '../_internal/identity';
import { stubFalse } from '../_internal/stubFalse';
import { stubTrue } from '../_internal/stubTrue';

describe('every', () => {
  it('should return true for array with all elements passing predicate', () => {
    const arr = [1, 2, 3, 4];
    const result = every(arr, n => n > 0);
    expect(result).toBe(true);
  });

  it('should return false for array when an element does not pass predicate', () => {
    const arr = [1, 2, 3, -4];
    const result = every(arr, n => n > 0);
    expect(result).toBe(false);
  });

  it('should return true for empty array', () => {
    const result = every([], () => false);
    expect(result).toBe(true);
  });

  it('should return true for object with all values passing predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = every(obj, value => value > 0);
    expect(result).toBe(true);
  });

  it('should return false for object when a value does not pass predicate', () => {
    const obj = { a: 1, b: -2, c: 3 };
    const result = every(obj, value => value > 0);
    expect(result).toBe(false);
  });

  it('should return true for empty object', () => {
    const result = every({}, () => false);
    expect(result).toBe(true);
  });

  it('should correctly handle indices for arrays', () => {
    const arr = [1, 2, 3];
    const result = every(arr, (n, index) => index < 3);
    expect(result).toBe(true);
  });

  it('should correctly handle keys for objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = every(obj, (value, key) => ['a', 'b', 'c'].includes(key as any));
    expect(result).toBe(true);
  });

  it('should return `true` if `predicate` returns truthy for all elements', () => {
    expect(every([true, 1, 'a'], identity)).toBe(true);
  });

  it('should return `true` for empty collections', () => {
    const expected = empties.map(stubTrue);

    const actual = empties.map(value => {
      try {
        return every(value, identity);
      } catch (e) {
        /* empty */
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should return `false` as soon as `predicate` returns falsey', () => {
    let count = 0;

    expect(
      every([true, null, true], value => {
        count++;
        return value;
      })
    ).toEqual(false);

    expect(count).toBe(2);
  });

  it('should work with collections of `undefined` values (test in IE < 9)', () => {
    expect(every([undefined, undefined, undefined], identity)).toBe(false);
  });

  it('should use `_.identity` when `predicate` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    let expected = values.map(stubFalse);

    let actual = values.map((value, index) => {
      const array = [0];
      // eslint-disable-next-line
      // @ts-ignore
      return index ? every(array, value) : every(array);
    });

    expect(actual).toEqual(expected);

    expected = values.map(stubTrue);
    actual = values.map((value, index) => {
      const array = [1];
      // eslint-disable-next-line
      // @ts-ignore
      return index ? every(array, value) : every(array);
    });

    expect(actual).toEqual(expected);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ];
    expect(every(objects, 'a')).toBe(false);
    expect(every(objects, 'b')).toBe(true);
  });

  it('should work with `_.matches` shorthands', () => {
    const objects = [
      { a: 0, b: 0 },
      { a: 0, b: 1 },
    ];
    expect(every(objects, { a: 0 })).toBe(true);
    expect(every(objects, { b: 1 })).toBe(false);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = [[1]].map(every);
    expect(actual).toEqual([true]);
  });
});
