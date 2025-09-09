import { describe, expect, expectTypeOf, it } from 'vitest';
import type { findKey as findKeyLodash } from 'lodash';
import { findKey } from './findKey';

describe('findKey', () => {
  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];
  it('should return the found key', () => {
    // @ts-expect-error invalid argument
    expect(findKey(objects, object => object.a)).toBe('1');
  });

  it('should return undefined if value is not found', () => {
    // @ts-expect-error invalid argument
    expect(findKey(objects, object => object.a === 3)).toBeUndefined();
  });

  it('should work with matches shorthand', () => {
    expect(findKey(objects, { b: 2 })).toBe('2');
  });

  it('should work with matchesProperty shorthand', () => {
    expect(findKey(objects, ['b', 2])).toBe('2');
  });

  it('should work with property shorthand', () => {
    expect(findKey(objects, 'b')).toBe('1');
  });

  it('should return undefined for empty collections', () => {
    const emptyValues = [[], {}, null, undefined, ''];
    emptyValues.forEach(value => {
      // @ts-expect-error invalid argument
      expect(findKey(value, { a: 3 })).toBeUndefined();
    });
  });

  it('should work with an object for `collection`', () => {
    expect(findKey({ a: 1, b: 2, c: 3 }, n => n < 3)).toBe('a');
  });

  it('should provide correct predicate arguments for objects', () => {
    let args;
    const object = { a: 1 };

    findKey(object, function () {
      // eslint-disable-next-line prefer-rest-params
      args = Array.from(arguments);
    });

    expect(args).toEqual([1, 'a', object]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(findKey).toEqualTypeOf<typeof findKeyLodash>();
  });
});
