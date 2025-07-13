import { describe, expect, expectTypeOf, it } from 'vitest';
import { concat } from 'es-toolkit/compat';
import type { concat as concatLodash } from 'lodash';

describe('concat', () => {
  it('should shallow clone `array`', () => {
    const array = [1, 2, 3];
    const actual = concat(array);

    expect(actual).toEqual(array);
    expect(actual === array).toBe(false);
  });

  it('should concat arrays and values', () => {
    const array = [1];
    const actual = concat<unknown>(array, 2, [3], [[4]]);

    expect(actual).toEqual([1, 2, 3, [4]]);
    expect(array).toEqual([1]);
  });

  it('should cast non-array `array` values to arrays', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, false, true, 1, NaN, 'a'];

    let expected: unknown[] = values.map((value, index) => (index ? [value] : []));

    let actual: unknown[] = values.map((value, index) => (index ? concat(value) : concat()));

    expect(actual).toEqual(expected);

    expected = values.map(value => [value, 2, [3]]);

    actual = values.map(value => concat<unknown>(value, [2], [[3]]));

    expect(actual).toEqual(expected);
  });

  it('should treat sparse arrays as dense', () => {
    const expected = [];
    const actual = concat(Array(1), Array(1));

    expected.push(undefined, undefined);

    expect('0' in actual).toBeTruthy();
    expect('1' in actual).toBeTruthy();
    expect(actual).toEqual(expected);
  });

  it('should return a new wrapped array', () => {
    const array = [1];
    const actual = concat(array, [2, 3]);

    expect(array).toEqual([1]);
    expect(actual).toEqual([1, 2, 3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(concat).toEqualTypeOf<typeof concatLodash>();
  });
});
