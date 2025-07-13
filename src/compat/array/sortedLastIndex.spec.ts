import { describe, expect, expectTypeOf, it } from 'vitest';
import { sortBy } from 'es-toolkit/compat';
import { sortedLastIndex } from 'es-toolkit/compat';
import type { sortedLastIndex as sortedLastIndexLodash } from 'lodash';

describe('sortedLastIndex', () => {
  it(`should return the correct insert index`, () => {
    const array = [30, 50];
    const values = [30, 40, 50];
    const expected = [1, 1, 2];

    const actual = values.map(value => sortedLastIndex(array, value));

    expect(actual).toEqual(expected);
  });

  it(`should work with an array of strings`, () => {
    const array = ['a', 'c'];
    const values = ['a', 'b', 'c'];
    const expected = [1, 1, 2];

    const actual = values.map(value => sortedLastIndex(array, value));

    expect(actual).toEqual(expected);
  });

  it(`should handle nullish 'array' and a 'value'`, () => {
    const values = [null, undefined];
    const expected = values.map(() => [0, 0, 0]);

    const actual = values.map(array => [
      sortedLastIndex(array as any, 1),
      sortedLastIndex(array as any, undefined),
      sortedLastIndex(array as any, NaN),
    ]);

    expect(actual).toEqual(expected);
  });

  it(`should align with 'sortBy' for various data types`, () => {
    const symbol1 = Symbol ? Symbol('a') : null;
    const symbol2 = Symbol ? Symbol('b') : null;
    const symbol3 = Symbol ? Symbol('c') : null;

    const expected = [1, '2', {}, symbol1, symbol2, null, undefined, NaN, NaN];

    const array1 = [NaN, symbol1, null, 1, '2', {}, symbol2, NaN, undefined];
    const array2 = ['2', null, 1, symbol1, NaN, {}, NaN, symbol2, undefined];
    expect(sortBy(array1)).toEqual(expected);
    expect(sortBy(array2)).toEqual(expected);
    expect(sortedLastIndex(expected, 3)).toBe(2);
    expect(sortedLastIndex(expected, symbol3)).toBe(5);
    expect(sortedLastIndex(expected, null)).toBe(6);
    expect(sortedLastIndex(expected, undefined)).toBe(7);
    expect(sortedLastIndex(expected, NaN)).toBe(9);
  });

  it(`should handle arrays with nulls`, () => {
    const array = [null, null];

    expect(sortedLastIndex(array, null)).toBe(2);
    expect(sortedLastIndex(array, 1)).toBe(0);
    expect(sortedLastIndex(array, 'a')).toBe(0);
  });

  it(`should handle arrays with symbols`, () => {
    const symbol1 = Symbol ? Symbol('a') : null;
    const symbol2 = Symbol ? Symbol('b') : null;
    const symbol3 = Symbol ? Symbol('c') : null;
    const array = [symbol1, symbol2];

    expect(sortedLastIndex(array, symbol3)).toBe(2);
    expect(sortedLastIndex(array, 1 as unknown as symbol)).toBe(0);
    expect(sortedLastIndex(array, 'a' as unknown as symbol)).toBe(0);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(sortedLastIndex).toEqualTypeOf<typeof sortedLastIndexLodash>();
  });
});
