import { describe, expect, it } from 'vitest';
import { sortedIndexOf } from './sortedIndexOf';

describe('sortedIndexOf', () => {
  //--------------- Lodash Test Case #1 -------------------
  it('should find first occurrence in numeric array', () => {
    const array = [4, 4, 5, 5, 5, 6, 6];
    expect(sortedIndexOf(array, 5)).toBe(2);
  });

  //--------------- Lodash Test Case #2 -------------------
  it(`should return \`-1\` for an unmatched value`, () => {
    const array = [1, 2, 3];
    const empty = [];

    expect(sortedIndexOf(array, 4)).toBe(-1);
    expect(sortedIndexOf(array, 4, true)).toBe(-1);
    expect(sortedIndexOf(array, undefined, true)).toBe(-1);

    expect(sortedIndexOf(empty, undefined)).toBe(-1);
    expect(sortedIndexOf(empty, undefined, true)).toBe(-1);
  });

  it(`should not match values on empty arrays`, () => {
    const array = [];
    array[-1] = 0;

    expect(sortedIndexOf(array, undefined)).toBe(-1);
    expect(sortedIndexOf(array, 0, true)).toBe(-1);
  });

  it(`should match \`NaN\``, () => {
    const sortedArray = [1, 2, NaN, NaN];

    expect(sortedIndexOf(sortedArray, NaN, true)).toBe(2);
  });

  it(`should match \`-0\` as \`0\``, () => {
    expect(sortedIndexOf([-0], 0)).toBe(0);
    expect(sortedIndexOf([0], -0)).toBe(0);
  });

  //--------------- Additional Test Case ---------------
  // Floating point handling
  it('should handle floating point numbers', () => {
    const array = [1.1, 2.2, 3.3];
    expect(sortedIndexOf(array, 2.2)).toBe(1);
  });

  // Type strict checking
  it('should differentiate string and number types', () => {
    const array = ['4', '5', '5'];
    expect(sortedIndexOf(array, '5')).toBe(1);
  });

  //NaN values in unsorted array
  it('should not handle array with NaN Searching Number', () => {
    const array = [NaN, 2, NaN, 3, 4];
    expect(sortedIndexOf(array, 3)).toBe(-1);
  });

  // Non-existent values
  it('should return -1 for non-existent values', () => {
    const array = [1, 3, 5];
    expect(sortedIndexOf(array, 2)).toBe(-1);
  });

  // Null/undefined handling
  it('should handle null values', () => {
    const array = [null, null, 3];
    expect(sortedIndexOf(array, null)).toBe(0);
    expect(sortedIndexOf(array, 3)).toBe(-1);
  });

  it('should handle undefined values', () => {
    const array = [undefined, undefined, 1];
    expect(sortedIndexOf(array, undefined)).toBe(0);
    expect(sortedIndexOf(array, 1)).toBe(-1);
  });

  it('should handle NAN values', () => {
    const array = [0, 1, NaN, NaN, NaN, 3];
    expect(sortedIndexOf(array, NaN)).toBe(2);
    expect(sortedIndexOf(array, 0)).toBe(0);
  });

  // Symbol handling
  it('should handle Symbol values correctly', () => {
    const sym = Symbol('test');
    const array = [sym, sym, Symbol('test2')];
    expect(sortedIndexOf(array, sym)).toBe(0);

    const uniqueSym = Symbol('unique');
    expect(sortedIndexOf(array, uniqueSym)).toBe(-1);
  });

  it('should strictly compare types', () => {
    expect(sortedIndexOf(['5', 5], 5)).toBe(-1);
    expect(sortedIndexOf([0, false, 1], 1)).toBe(2);
  });

  // Array-like objects
  it('should handle array-like objects', () => {
    const arrayLike = {
      length: 3,
      0: 1,
      1: 3,
      2: 5,
    };
    expect(sortedIndexOf(arrayLike, 3)).toBe(1);
    expect(sortedIndexOf(arrayLike, 4)).toBe(-1);
  });

  // Unsorted arrays
  it('should return -1 for unsorted arrays', () => {
    const unsortedArray = [5, 2, 7, 1];
    expect(sortedIndexOf(unsortedArray, 2)).toBe(-1);
  });

  // Mixed types
  it('should handle mixed types with undefined correctly', () => {
    const arr = [undefined, null, Symbol('test'), 1];
    expect(sortedIndexOf(arr, null)).toBe(-1);
    expect(sortedIndexOf(arr, undefined)).toBe(-1);
    expect(sortedIndexOf(arr, Symbol('test'))).toBe(-1);
  });

  // Mixed types ver2
  it('should handle mixed types with midVal is NaN correctly', () => {
    const arr = [undefined, null, NaN, Symbol('test'), 1];
    expect(sortedIndexOf(arr, null)).toBe(-1);
    expect(sortedIndexOf(arr, undefined)).toBe(-1);
    expect(sortedIndexOf(arr, NaN)).toBe(2);
  });
});
