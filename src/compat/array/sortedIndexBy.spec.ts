import { describe, expect, it } from 'vitest';
import { sortedIndexBy } from './sortedIndexBy';

describe('sortedIndexBy', () => {
  it('should work correctly', () => {
    const objects = [{ n: 4 }, { n: 5 }];
    expect(sortedIndexBy(objects, { n: 4 }, ({ n }) => n)).toBe(0);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: unknown[];

    sortedIndexBy([30, 50], 40, function () {
      args || (args = Array.prototype.slice.call(arguments));
    });
    // @ts-expect-error
    expect(args).toEqual([40]);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ x: 30 }, { x: 50 }];
    const actual = sortedIndexBy(objects, { x: 40 }, v => v.x);

    expect(actual).toBe(1);
  });

  it('should avoid calling iteratee when length is 0', () => {
    const objects: Array<{ x: number }> = [];
    const actual = sortedIndexBy(objects, { x: 50 }, () => {
      throw new Error('Iteratee should not be called');
    });

    expect(actual).toBe(0);
  });

  it('should support arrays larger than `MAX_ARRAY_LENGTH / 2`', () => {
    const MAX_ARRAY_LENGTH = 4294967295;
    const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;
    const testLengths = [Math.ceil(MAX_ARRAY_LENGTH / 2), MAX_ARRAY_LENGTH];

    testLengths.forEach(length => {
      const array: number[] = [];
      const values = [MAX_ARRAY_LENGTH, NaN, undefined];

      array.length = length;

      values.forEach(value => {
        let steps = 0;

        const actual = sortedIndexBy(array, value, v => {
          steps++;
          return v;
        });

        const expected = !Number.isNaN(value) ? 0 : Math.min(length, MAX_ARRAY_INDEX);

        // Check if steps are within expected bounds
        expect(steps).toBeGreaterThanOrEqual(32);
        expect(steps).toBeLessThanOrEqual(33);
        expect(actual).toBe(expected);
      });
    });
  });
});
