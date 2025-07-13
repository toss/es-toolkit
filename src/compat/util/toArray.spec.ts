import { describe, expect, expectTypeOf, it } from 'vitest';
import { toArray } from 'es-toolkit/compat';
import type { toArray as toArrayLodash } from 'lodash';

describe('toArray', () => {
  it('should convert objects to arrays', () => {
    expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  it('should convert iterables to arrays', () => {
    if (Symbol && Symbol.iterator) {
      const object = { 0: 'a', length: 1 };
      expect(toArray(object)).toEqual(['a']);
    }
  });

  it('should convert maps to arrays', () => {
    if (Map) {
      const map = new Map();
      map.set('a', 1);
      map.set('b', 2);
      expect(toArray(map)).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    }
  });

  it('should convert strings to arrays', () => {
    expect(toArray('')).toEqual([]);
    expect(toArray('ab')).toEqual(['a', 'b']);
    expect(toArray(Object('ab'))).toEqual(['a', 'b']);
  });

  it('should convert nullish values to empty arrays', () => {
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
  });

  it('should convert non-iterable values to empty arrays', () => {
    expect(toArray(1)).toEqual([]);
    expect(toArray(true)).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(toArray).toEqualTypeOf<typeof toArrayLodash>();
  });
});
