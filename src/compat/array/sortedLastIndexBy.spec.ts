import { describe, expect, it } from 'vitest';
import { sortedLastIndexBy } from './sortedLastIndexBy';

describe('sortedLastIndexBy', () => {
  it('should provide correct `iteratee` arguments', () => {
    let args: unknown[];

    sortedLastIndexBy([30, 50], 40, function (value) {
      args = args || [value];
    });
    // @ts-expect-error Variable 'args' is used before being assigned.ts(2454)
    expect(args).toEqual([40]);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ x: 30 }, { x: 50 }];
    const actual = sortedLastIndexBy(objects, { x: 40 }, 'x');

    expect(actual).toBe(1);
  });

  it('should avoid calling iteratee when length is 0', () => {
    const objects: Array<{ x: number }> = [];
    const actual = sortedLastIndexBy(objects, { x: 50 }, () => {
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

        const actual = sortedLastIndexBy(array, value, v => {
          steps++;
          return v;
        });

        const expected = Number.isFinite(value) ? 0 : Math.min(length, MAX_ARRAY_INDEX);

        // Check if steps are within expected bounds
        expect(steps).toBeGreaterThanOrEqual(32);
        expect(steps).toBeLessThanOrEqual(33);
        expect(actual).toBe(expected);
      });
    });
  });
});
