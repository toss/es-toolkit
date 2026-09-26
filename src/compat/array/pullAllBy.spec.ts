import { describe, expect, it } from 'vitest';
import { pullAllBy } from './pullAllBy';

describe('pullAllBy', () => {
  it('should accept an `iteratee`', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

    const actual = pullAllBy(array, [{ x: 1 }, { x: 3 }], object => object.x);

    expect(actual).toEqual([{ x: 2 }]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

    pullAllBy(array, [{ x: 1 }, { x: 3 }], function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    expect(args).toEqual([{ x: 1 }]);
  });

  it('should handle sparse arrays correctly', () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [{ x: 1 }, { x: 2 }, , { x: 3 }, { x: 1 }];

    const actual = pullAllBy(array, [{ x: 1 }, { x: 3 }], object => object?.x);

    expect(Object.hasOwn(actual, '0')).toEqual(true);
    expect(Object.hasOwn(actual, '1')).toEqual(false);
  });
  it('should return the array as is when it is `null` or `undefined`', () => {
    // @ts-expect-error - lodash accepts a nullish array
    expect(pullAllBy(null, [1])).toBe(null);
    // @ts-expect-error - lodash accepts a nullish array
    expect(pullAllBy(undefined, [1])).toBe(undefined);
  });

  it('should return the array as is when `values` is omitted, `null` or `undefined`', () => {
    const array = [1, 2, 1];

    expect(pullAllBy(array)).toBe(array);
    // @ts-expect-error - lodash accepts nullish values
    expect(pullAllBy(array, null, x => x)).toBe(array);
    expect(pullAllBy(array, undefined, x => x)).toBe(array);
    expect(array).toEqual([1, 2, 1]);
  });

  it('should ignore `values` that are not array-like like lodash', () => {
    const array = [1, 2, 3];

    // @ts-expect-error - lodash accepts non-array-like values
    expect(pullAllBy(array, new Set([1]))).toBe(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
