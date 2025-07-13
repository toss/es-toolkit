import { describe, expect, expectTypeOf, it } from 'vitest';
import { stubArray } from 'es-toolkit/compat';
import { times } from 'es-toolkit/compat';
import type { times as timesLodash } from 'lodash';
import { doubled } from '../_internal/doubled';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';

describe('times', () => {
  it('should coerce non-finite `n` values to `0`', () => {
    [-Infinity, NaN, Infinity].forEach(n => {
      expect(times(n)).toEqual([]);
    });
  });

  it('should coerce `n` to an integer', () => {
    const actual = times(2.6, n => n);
    expect(actual).toEqual([0, 1]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    times(1, function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-rest-params
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([0]);
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(() => [0, 1, 2]);

    const actual = values.map((value, index) => (index ? times(3, value as any) : times(3)));

    expect(actual).toEqual(expected);
  });

  it('should return an array of the results of each `iteratee` execution', () => {
    expect(times(3, doubled)).toEqual([0, 2, 4]);
  });

  it('should return an empty array for falsey and negative `n` values', () => {
    const values = falsey.concat(-1, -Infinity);
    const expected = values.map(stubArray);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = values.map((value, index) => (index ? times(value as any) : times()));

    expect(actual).toEqual(expected);
  });

  it('should return an empty array when `n > Number.MAX_SAFE_INTEGER`', () => {
    expect(times(Number.MAX_SAFE_INTEGER + 1)).toEqual([]);
    expect(times(Number.MAX_VALUE, doubled)).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(times).toEqualTypeOf<typeof timesLodash>();
  });
});
