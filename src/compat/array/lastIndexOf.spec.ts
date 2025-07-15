import { describe, expect, expectTypeOf, it } from 'vitest';
import { lastIndexOf } from 'es-toolkit/compat';
import type { lastIndexOf as lastIndexOfLodash } from 'lodash';

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
    const values = [6, 8, Math.pow(2, 32), Infinity];
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

  it(`should coerce \`fromIndex\` to an integer`, () => {
    expect(lastIndexOf(array, 2, 4.2)).toBe(4);
  });

  it(`should return -1 for empty array or nullish values`, () => {
    expect(lastIndexOf([], 1)).toBe(-1);
    expect(lastIndexOf(null, 1)).toBe(-1);
    expect(lastIndexOf(undefined, 1)).toBe(-1);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(lastIndexOf).toEqualTypeOf<typeof lastIndexOfLodash>();
  });
});
