import { describe, expect, expectTypeOf, it } from 'vitest';
import type { mapKeys as mapKeysLodash } from 'lodash';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  const array = [1, 2];
  const object = { a: 1, b: 2 };

  it('should map keys in `object` to a new object', () => {
    const actual = mapKeys(object, String);
    expect(actual).toEqual({ 1: 1, 2: 2 });
  });

  it('should treat arrays like objects', () => {
    const actual = mapKeys(array, String);
    expect(actual).toEqual({ 1: 1, 2: 2 });
  });

  it('should work with `_.property` shorthands', () => {
    const actual = mapKeys({ a: { b: 'c' } }, 'b');
    expect(actual).toEqual({ c: { b: 'c' } });
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const object = { a: 1, b: 2 };
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(() => ({ 1: 1, 2: 2 }));

    // eslint-disable-next-line
    // @ts-ignore
    const actual = values.map((value, index) => (index ? mapKeys(object, value) : mapKeys(object)));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(mapKeys).toEqualTypeOf<typeof mapKeysLodash>();
  });

  it('should return empty object when object is null', () => {
    expect(mapKeys(null)).toEqual({});
  });

  it('should return empty object when object is undefined', () => {
    expect(mapKeys(undefined)).toEqual({});
  });
});
