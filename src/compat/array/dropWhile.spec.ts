import { describe, expect, it, expectTypeOf } from 'vitest';
import type { dropWhile as dropWhileLodash } from 'lodash';
import { dropWhile } from './dropWhile';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/dropWhile.spec.js
 */
describe('dropWhile', () => {
  const array = [1, 2, 3, 4];

  const objects = [
    { a: 2, b: 2, 0: 2, [Symbol.for('a')]: 2 },
    { a: 1, b: 1, 0: 1, [Symbol.for('a')]: 1 },
    { a: 0, b: 0, 0: 0, [Symbol.for('a')]: 0 },
  ];

  it('should drop elements while `predicate` returns truthy', function () {
    const actual = dropWhile(array, function (n) {
      return n < 3;
    });

    expect(actual).toEqual([3, 4]);
  });

  it('should provide correct `predicate` arguments', function () {
    let args;

    dropWhile(array, function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });

    expect(args).toEqual([1, 0, array]);
  });

  it('should work with `_.matches` shorthands', function () {
    expect(dropWhile(objects, { b: 2 })).toEqual(objects.slice(1));
  });

  it('should work with `_.matchesProperty` shorthands', function () {
    expect(dropWhile(objects, ['b', 2])).toEqual(objects.slice(1));
    expect(dropWhile(objects, [0, 2])).toEqual(objects.slice(1));
    expect(dropWhile(objects, [Symbol.for('a'), 2])).toEqual(objects.slice(1));
  });

  it('should work with `_.property` shorthands', function () {
    expect(dropWhile(objects, 'b')).toEqual(objects.slice(2));
    expect(dropWhile(objects, 0)).toEqual(objects.slice(2));
    expect(dropWhile(objects, Symbol.for('a'))).toEqual(objects.slice(2));
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(dropWhile(null, () => true)).toEqual([]);
    expect(dropWhile(undefined, () => true)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(dropWhile(1, () => true)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(dropWhile(true, () => true)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(dropWhile({ 0: 1, 1: 2, 2: 3, length: 3 }, n => n < 3)).toEqual([3]);
    expect(dropWhile('123', n => Number(n) < 3)).toEqual(['3']);
    expect(dropWhile(args, n => n < 3)).toEqual([3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(dropWhile).toEqualTypeOf<typeof dropWhileLodash>();
  });
});
