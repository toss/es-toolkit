import { describe, expect, expectTypeOf, it } from 'vitest';
import type { minBy as minByLodash } from 'lodash';
import { minBy } from './minBy';

describe('minBy', () => {
  it('should work with Date objects', () => {
    const curr = new Date();
    const past = new Date(0);

    expect(minBy([curr, past], date => date.getTime())).toBe(past);
  });

  it('should work with extremely large arrays', () => {
    const array = Array.from({ length: 5e5 }, (_, i) => i);
    expect(minBy(array, x => x)).toBe(0);
  });

  it('should work when chaining on an array with only one value', () => {
    const array = [40];
    expect(minBy(array, x => x)).toBe(40);
  });

  const array = [1, 2, 3];

  it('should work with an `iteratee`', () => {
    const actual = minBy(array, n => -n);
    expect(actual).toBe(3);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    expect(minBy(objects, 'a')).toEqual(objects[2]);

    const arrays = [[2], [3], [1]];
    expect(minBy(arrays, 0)).toEqual(arrays[2]);
  });

  it('should work when `iteratee` returns +/-Infinity', () => {
    const value = -Infinity;
    const object = { a: value };

    const actual = minBy([object, { a: value }], obj => obj.a);
    expect(actual).toBe(object);
  });

  it('should handle null and undefined values', () => {
    // @ts-expect-error - null is not an array
    expect(minBy(null)).toBe(undefined);
    // @ts-expect-error - undefined is not an array
    expect(minBy(undefined)).toBe(undefined);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(minBy).toEqualTypeOf<typeof minByLodash>();
  });
});
