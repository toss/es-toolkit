import { describe, expect, it } from 'vitest';
import { lastIndexOf } from './lastIndexOf';
import { falsey } from '../_internal/falsey';

/**
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/findLastIndex-and-lastIndexOf.spec.js
 */

describe('lastIndexOf', () => {
  const array = [1, 2, 3, 1, 2, 3];

  it(`should return the index of the last matched value`, () => {
    expect(lastIndexOf(array, 3)).toBe(5);
  });

  it(`should work with \`NaN\``, () => {
    expect(lastIndexOf([1, 2, 3, NaN, 1, 2], NaN)).toBe(3);
  });

  it(`should work with a positive \`fromIndex\``, () => {
    expect(lastIndexOf(array, 1, 2)).toBe(0);
  });

  it(`should work with a \`fromIndex\` >= \`length\``, () => {
    const values = [6, 8, 2 ** 32, Infinity];
    const expected = values.map(() => [-1, 3]);

    const actual = values.map(fromIndex => [
      lastIndexOf(array, undefined, fromIndex),
      lastIndexOf(array, 1, fromIndex),
    ]);

    expect(actual).toEqual(expected);
  });

  it(`should work with a negative \`fromIndex\``, () => {
    expect(lastIndexOf(array, 2, -3)).toBe(1);
  });

  it(`should work with a negative \`fromIndex\` <= \`-length\``, () => {
    const values = [-6, -8, -Infinity];
    const expected = values.map(() => 0);

    const actual = values.map(fromIndex => lastIndexOf(array, 1, fromIndex));

    expect(actual).toEqual(expected);
  });

  it(`should treat falsey \`fromIndex\` values correctly`, () => {
    const expected = falsey.map(value => (value === undefined ? 5 : -1));

    const actual = falsey.map((fromIndex: any) => lastIndexOf(array, 3, fromIndex));

    expect(actual).toEqual(expected);
  });

  it(`should coerce \`fromIndex\` to an integer`, () => {
    expect(lastIndexOf(array, 2, 4.2)).toBe(4);
    expect(lastIndexOf(array, 1, '-1' as any)).toBe(3);
  });

  it(`should coerce null and boolean \`fromIndex\` values to integers`, () => {
    expect(lastIndexOf(array, 1, null as any)).toBe(0);
    expect(lastIndexOf(array, 2, null as any)).toBe(-1);
    expect(lastIndexOf(array, 1, false as any)).toBe(0);
    expect(lastIndexOf(array, 1, true)).toBe(0);
  });

  it(`should return -1 for empty array or nullish values`, () => {
    expect(lastIndexOf([], 1)).toBe(-1);
    expect(lastIndexOf(null, 1)).toBe(-1);
    expect(lastIndexOf(undefined, 1)).toBe(-1);
  });

  it(`should treat holes in a sparse array as \`undefined\``, () => {
    const sparse = [1];
    sparse[2] = 1;

    expect(lastIndexOf(sparse, undefined, 2)).toBe(1);

    const allHoles: number[] = [];
    allHoles.length = 2;

    expect(lastIndexOf(allHoles, undefined, 1)).toBe(1);
  });

  it(`should find values in a sparse array`, () => {
    const sparse = [1];
    sparse[2] = 1;

    expect(lastIndexOf(sparse, 1)).toBe(2);
    expect(lastIndexOf(sparse, 1, 1)).toBe(0);

    const withNaN = [1];
    withNaN[2] = NaN;

    expect(lastIndexOf(withNaN, NaN)).toBe(2);
  });

  it(`should work with array-like values`, () => {
    expect(lastIndexOf({ 0: 1, 1: 2, 2: 3, 3: 2, length: 4 }, 2)).toBe(3);
    expect(lastIndexOf('abcb', 'b')).toBe(3);
  });
});
