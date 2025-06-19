import { describe, expect, expectTypeOf, it } from 'vitest';
import type { findLastKey as findLastKeyLodash } from 'lodash';
import { findLastKey } from './findLastKey';

describe('findLastKey', () => {
  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];
  it('should return the found key', () => {
    // @ts-expect-error invalid argument
    expect(findLastKey(objects, object => object.a)).toBe('2');
  });

  it('should return undefined if value is not found', () => {
    // @ts-expect-error invalid argument
    expect(findLastKey(objects, object => object.a === 3)).toBeUndefined();
  });

  it('should work with matches shorthand', () => {
    expect(findLastKey(objects, { b: 2 })).toBe('2');
  });

  it('should work with matchesProperty shorthand', () => {
    expect(findLastKey(objects, ['b', 2])).toBe('2');
  });

  it('should work with property shorthand', () => {
    expect(findLastKey(objects, 'b')).toBe('2');
  });

  it('should return undefined for empty collections', () => {
    const emptyValues = [[], {}, null, undefined, ''];
    emptyValues.forEach(value => {
      // @ts-expect-error invalid argument
      expect(findLastKey(value, { a: 3 })).toBeUndefined();
    });
  });

  it('should work with an object for `collection`', () => {
    expect(findLastKey({ a: 1, b: 2, c: 3 }, n => n < 3)).toBe('b');
  });

  it('should provide correct predicate arguments for objects', () => {
    let args;
    const object = { a: 1 };

    findLastKey(object, function () {
      // eslint-disable-next-line prefer-rest-params
      args = Array.from(arguments);
    });

    expect(args).toEqual([1, 'a', object]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(findLastKey).toEqualTypeOf<typeof findLastKeyLodash>();
  });
});
