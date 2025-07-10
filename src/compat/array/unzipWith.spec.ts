import { describe, expect, expectTypeOf, it } from 'vitest';
import type { unzipWith as unzipWithLodash } from 'lodash';
import { map } from './map';
import { unzip } from './unzip';
import { unzipWith } from './unzipWith';
import { slice } from '../_internal/slice';
import { constant } from '../util/constant';

describe('unzipWith', () => {
  it('should unzip arrays combining regrouped elements with `iteratee`', () => {
    const array = [
      [1, 4],
      [2, 5],
      [3, 6],
    ];

    const actual = unzipWith(array, (a, b, c) => a + b + c);

    expect(actual).toEqual([6, 15]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: number[] | undefined;

    unzipWith(
      [
        // eslint-disable-next-line
        // @ts-ignore
        [1, 3, 5],
        // eslint-disable-next-line
        // @ts-ignore
        [2, 4, 6],
      ],
      function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-rest-params
        args || (args = slice.call(arguments));
      }
    );

    expect(args).toEqual([1, 2]);
  });

  it('should perform a basic unzip when `iteratee` is nullish', () => {
    const array = [
      [1, 3],
      [2, 4],
    ];
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = map(values, constant(unzip(array)));

    // eslint-disable-next-line
    // @ts-ignore
    const actual = map(values, (value, index) => (index ? unzipWith(array, value) : unzipWith(array)));

    expect(actual).toEqual(expected);
  });

  it('should work with array-like objects', () => {
    const array = { 0: [1, 3], 1: [2, 4], length: 2 };

    expect(unzipWith(array, (a, b) => a + b)).toEqual([3, 7]);
  });

  it('should work with tuples of different lengths', () => {
    const array = [
      ['barney', 36],
      ['fred', 40, false],
    ];

    expect(unzipWith(array, (a, b) => [a, b])).toEqual([
      ['barney', 'fred'],
      [36, 40],
      [undefined, false],
    ]);
  });

  it('should return an empty array when `array` is an empty array', () => {
    expect(unzipWith([])).toEqual([]);
  });

  it('should return an empty array when `array` is null or undefined', () => {
    expect(unzipWith(null)).toEqual([]);
    expect(unzipWith(undefined)).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(unzipWith).toEqualTypeOf<typeof unzipWithLodash>();
  });
});
