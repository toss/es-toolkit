import { describe, expect, expectTypeOf, it } from 'vitest';
import type { keyBy as keyByLodash } from 'lodash';
import { keyBy } from './keyBy.ts';

describe('keyBy', () => {
  const array = [
    { dir: 'left', code: 97 },
    { dir: 'right', code: 100 },
  ];

  it('should transform keys by `iteratee`', () => {
    const expected = { a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } };

    const actual = keyBy(array, object => String.fromCharCode(object.code));

    expect(actual).toEqual(expected);
  });

  it('should use identity when iteratee is nullish', () => {
    const array = [4, 6, 6];
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(() => ({ 4: 4, 6: 6 }));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = values.map((value, index) => (index ? keyBy(array, value) : keyBy(array)));

    expect(actual).toEqual(expected);
  });

  it('should work with `_.property` shorthands', () => {
    const expected = { left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } };
    const actual = keyBy(array, 'dir');

    expect(actual).toEqual(expected);
  });

  it('should only add values to own, not inherited, properties', () => {
    const actual = keyBy([6.1, 4.2, 6.3], n => (Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor'));

    expect(actual.constructor).toEqual(4.2);
    expect(actual.hasOwnProperty).toEqual(6.3);
  });

  it('should work with a number for `iteratee`', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b'],
    ];

    expect(keyBy(array, 0)).toEqual({ 1: [1, 'a'], 2: [2, 'b'] });
    expect(keyBy(array, 1)).toEqual({ a: [2, 'a'], b: [2, 'b'] });
  });

  it('should work with an object for `collection`', () => {
    const actual = keyBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor);
    expect(actual).toEqual({ 4: 4.2, 6: 6.3 });
  });

  // additional tests
  it('should return an empty object for non-array/object collections', () => {
    const nonCollections = [null, undefined, 123, true, NaN, Symbol('test')];

    nonCollections.forEach(collection => {
      // @ts-expect-error Testing invalid input types
      expect(keyBy(collection)).toEqual({});
    });
  });

  it('should match the type of lodash', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(keyBy).toEqualTypeOf<typeof keyByLodash>();
  });
});
