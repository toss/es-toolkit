import { describe, expect, it } from 'vitest';
import { map } from './map';
import { zip } from './zip';
import { zipWith } from './zipWith';
import { constant } from '../util/constant';

describe('zipWith', () => {
  it('should zip arrays combining grouped elements with `iteratee`', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const array3 = [7, 8, 9];

    let actual = zipWith(array1, array2, array3, (a, b, c) => a + b + c);
    expect(actual).toEqual([12, 15, 18]);

    actual = zipWith(array1, [], (a, b) => a + (b || 0));
    expect(actual).toEqual([1, 2, 3]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    zipWith([1, 2], [3, 4], [5, 6], function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-rest-params
      args || (args = [...arguments]);
    });

    expect(args).toEqual([1, 3, 5]);
  });

  it('should perform a basic zip when `iteratee` is nullish', () => {
    const array1 = [1, 2];
    const array2 = [3, 4];
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = map(values, constant(zip(array1, array2)));

    const actual = map(values, (value, index) => (index ? zipWith(array1, array2, value) : zipWith(array1, array2)));

    expect(actual).toEqual(expected);
  });
});
