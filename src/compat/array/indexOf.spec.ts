import { describe, expect, it } from 'vitest';
import { indexOf } from './indexOf';
import { falsey } from '../_internal/falsey';
import { stubZero } from '../_internal/stubZero';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/indexOf.spec.js
 */
describe('indexOf', () => {
  const array = [1, 2, 3, 1, 2, 3];

  it('should return the index of the first matched value', () => {
    expect(indexOf(array, 3)).toBe(2);
  });

  it('should work with a positive `fromIndex`', () => {
    expect(indexOf(array, 1, 2)).toBe(3);
  });

  it('should work with a `fromIndex` >= `length`', () => {
    const values = [6, 8, 2 ** 32, Infinity];
    const expected = values.map(() => [-1, -1, -1]);

    const actual = values.map(fromIndex => [
      indexOf(array, undefined, fromIndex),
      indexOf(array, 1, fromIndex),
      // eslint-disable-next-line
      // @ts-ignore
      indexOf(array, '', fromIndex),
    ]);

    expect(actual).toEqual(expected);
  });

  it('should work with a negative `fromIndex`', () => {
    expect(indexOf(array, 2, -3)).toBe(4);
  });

  it('should work with a NaN `searchElement`', () => {
    expect(indexOf([1, 2, 3, 4], NaN)).toBe(-1);
    expect(indexOf([1, NaN, 3, NaN], NaN)).toBe(1);
    expect(indexOf([1, NaN, 3, NaN], 3, 1)).toBe(2);
    expect(indexOf([1, NaN, 3, NaN], 3, -2)).toBe(2);
    expect(indexOf([1, NaN, 3, NaN], NaN, -32)).toBe(1);
  });

  it('should work with a negative `fromIndex` <= `-length`', () => {
    const values = [-6, -8, -Infinity];
    const expected = values.map(stubZero);

    const actual = values.map(fromIndex => indexOf(array, 1, fromIndex));

    expect(actual).toEqual(expected);
  });

  it('should treat falsey `fromIndex` values as `0`', () => {
    const expected = falsey.map(stubZero);

    const actual = falsey.map(fromIndex => indexOf(array, 1, fromIndex as number));

    expect(actual).toEqual(expected);
  });

  it('should return `-1` for array is `null` or `undefined`', () => {
    expect(indexOf(null, 1)).toBe(-1);
    expect(indexOf(undefined, 1)).toBe(-1);
  });

  it('should coerce `fromIndex` to an integer', () => {
    expect(indexOf(array, 2, 1.2)).toBe(1);
  });
});
