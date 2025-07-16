import { describe, expect, expectTypeOf, it } from 'vitest';
import type { sortedLastIndexOf as sortedLastIndexOfLodash } from 'lodash';
import { sortedLastIndexOf } from './sortedLastIndexOf';
import { falsey } from '../_internal/falsey';

describe('sortedLastIndexOf', () => {
  //--------------- Lodash Test Case #1 -------------------
  it('`sortedLastIndexOf` should perform a binary search', () => {
    const sorted = [4, 4, 5, 5, 6, 6];
    expect(sortedLastIndexOf(sorted, 5)).toEqual(3);
  });

  //--------------- Lodash Test Case #2 -------------------
  it('`sortedLastIndexOf` should accept a falsey `array`', () => {
    const expected = falsey.map(() => -1);

    const actual = falsey.map((array, index) => {
      try {
        // @ts-expect-error - Testing with falsey values
        return index ? sortedLastIndexOf(array) : sortedLastIndexOf();
      } catch (e) {
        return undefined;
      }
    });

    expect(actual).toEqual(expected);
  });

  it('`sortedLastIndexOf` should return `-1` for an unmatched value', () => {
    const array = [1, 2, 3];
    const empty: unknown[] = [];

    expect(sortedLastIndexOf(array, 4)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, 4, true)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, undefined, true)).toBe(-1);

    expect(sortedLastIndexOf(empty, undefined)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(empty, undefined, true)).toBe(-1);
  });

  it('`sortedLastIndexOf` should not match values on empty arrays', () => {
    const array = [];
    array[-1] = 0;

    expect(sortedLastIndexOf(array, undefined)).toBe(-1);
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, 0, true)).toBe(-1);
  });

  it('`sortedLastIndexOf` should match `NaN`', () => {
    const array = [1, 2, NaN, NaN];
    // @ts-expect-error - Testing with extra parameter
    expect(sortedLastIndexOf(array, NaN, true)).toBe(3);
  });

  it('`sortedLastIndexOf` should match `-0` as `0`', () => {
    expect(sortedLastIndexOf([-0], 0)).toBe(0);
    expect(sortedLastIndexOf([0], -0)).toBe(0);
  });

  // Additional tests specific to sortedLastIndexOf
  it('should find the last occurrence of value in a sorted array', () => {
    const array = [1, 2, 2, 3, 3, 3, 4, 5, 5];
    expect(sortedLastIndexOf(array, 2)).toBe(2);
    expect(sortedLastIndexOf(array, 3)).toBe(5);
    expect(sortedLastIndexOf(array, 5)).toBe(8);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(sortedLastIndexOf).toEqualTypeOf<typeof sortedLastIndexOfLodash>();
  });
});
