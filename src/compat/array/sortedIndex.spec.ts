import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy.ts';
import { sortedIndex } from './sortedIndex.ts';

describe('sortedIndex', () => {
  it(`should return the correct insert index`, () => {
    const array = [30, 50];
    const values = [30, 40, 50];
    const expected = [0, 1, 1];

    const actual = values.map(value => sortedIndex(array, value));

    expect(actual).toEqual(expected);
  });

  it(`should work with an array of strings`, () => {
    const array = ['a', 'c'];
    const values = ['a', 'b', 'c'];
    const expected = [0, 1, 1];

    const actual = values.map(value => sortedIndex(array, value));

    expect(actual).toEqual(expected);
  });

  it(`should handle nullish 'array' and a 'value'`, () => {
    const values = [null, undefined];
    const expected = values.map(() => [0, 0, 0]);

    const actual = values.map(array => [
      sortedIndex(array as any, 1),
      sortedIndex(array as any, undefined),
      sortedIndex(array as any, NaN),
    ]);

    expect(actual).toEqual(expected);
  });

  it(`should align with 'sortBy' for various data types`, () => {
    const symbol1 = Symbol ? Symbol('a') : null;
    const symbol2 = Symbol ? Symbol('b') : null;
    const symbol3 = Symbol ? Symbol('c') : null;

    const expected = [1, '2', {}, symbol1, symbol2, null, undefined, NaN, NaN];

    const array = [NaN, symbol1, null, 1, '2', {}, symbol2, NaN, undefined];

    expect(sortBy(array)).toEqual(expected);
    expect(sortedIndex(expected, 3)).toBe(2);
    expect(sortedIndex(expected, symbol3)).toBe(3);
    expect(sortedIndex(expected, null)).toBe(5);
    expect(sortedIndex(expected, undefined)).toBe(6);
    expect(sortedIndex(expected, NaN)).toBe(7);
  });

  it(`should handle arrays with nulls`, () => {
    const array = [null, null];

    expect(sortedIndex(array, null)).toBe(0);
    expect(sortedIndex(array, 1)).toBe(0);
    expect(sortedIndex(array, 'a')).toBe(0);
  });

  it(`should handle arrays with symbols`, () => {
    const symbol1 = Symbol ? Symbol('a') : null;
    const symbol2 = Symbol ? Symbol('b') : null;
    const symbol3 = Symbol ? Symbol('c') : null;
    const array = [symbol1, symbol2];

    expect(sortedIndex(array, symbol3)).toBe(0);
    expect(sortedIndex(array, 1 as unknown as symbol)).toBe(0);
    expect(sortedIndex(array, 'a' as unknown as symbol)).toBe(0);
  });
});
