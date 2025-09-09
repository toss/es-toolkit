import { describe, expect, expectTypeOf, it } from 'vitest';
import type { maxBy as maxByLodash } from 'lodash';
import { maxBy } from './maxBy';

describe('maxBy', () => {
  it('should work with Date objects', () => {
    const curr = new Date();
    const past = new Date(0);

    expect(maxBy([curr, past], date => date.getTime())).toBe(curr);
  });

  it('should work with extremely large arrays', () => {
    const array = Array.from({ length: 5e5 }, (_, i) => i);
    expect(maxBy(array, x => x)).toBe(499999);
  });

  it('should work when chaining on an array with only one value', () => {
    const array = [40];
    expect(maxBy(array, x => x)).toBe(40);
  });

  const array = [1, 2, 3];

  it('should work with an `iteratee`', () => {
    const actual = maxBy(array, n => -n);
    expect(actual).toBe(1);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];
    expect(maxBy(objects, 'a')).toEqual(objects[1]);

    const arrays = [[2], [3], [1]];
    expect(maxBy(arrays, 0)).toEqual(arrays[1]);
  });

  it('should work when `iteratee` returns +/-Infinity', () => {
    const value = -Infinity;
    const object = { a: value };

    const actual = maxBy([object, { a: value }], obj => obj.a);
    expect(actual).toBe(object);
  });

  it('should handle null and undefined values', () => {
    expect(maxBy(null)).toBe(undefined);
    expect(maxBy(undefined)).toBe(undefined);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(maxBy).toEqualTypeOf<typeof maxByLodash>();
  });
});
