import { describe, expect, expectTypeOf, it } from 'vitest';
import type { takeWhile as takeWhileLodash } from 'lodash';
import { takeWhile } from './takeWhile';
import { slice } from '../_internal/slice';
import { toArgs } from '../_internal/toArgs';

describe('takeWhile', () => {
  const array = [1, 2, 3, 4];

  const objects = [
    { a: 2, b: 2 },
    { a: 1, b: 1 },
    { a: 0, b: 0 },
  ];

  it('should take elements while `predicate` returns truthy', () => {
    const actual = takeWhile(array, n => n < 3);
    expect(actual).toEqual([1, 2]);
  });

  it('should provide correct `predicate` arguments', () => {
    let args;
    takeWhile(array, function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });
    expect(args).toEqual([1, 0, array]);
  });

  it('should work with `_.matches` shorthands', () => {
    expect(takeWhile(objects, { b: 2 })).toEqual(objects.slice(0, 1));
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    expect(takeWhile(objects, ['b', 2])).toEqual(objects.slice(0, 1));
  });

  it('should work with `_.property` shorthands', () => {
    expect(takeWhile(objects, 'b')).toEqual(objects.slice(0, 2));
  });

  it('should use identity function as default `predicate`', () => {
    expect(takeWhile(['a', 'b'])).toEqual(['a', 'b']);
    expect(takeWhile([true, false])).toEqual([true]);
  });

  it('should return empty array when `array` is nullable', () => {
    expect(takeWhile(null, () => true)).toEqual([]);
    expect(takeWhile(undefined, () => true)).toEqual([]);
    expect(takeWhile(null)).toEqual([]);
    expect(takeWhile(undefined)).toEqual([]);
  });

  it('should work with array-like objects', () => {
    expect(takeWhile({ 0: 3, 1: 2, 2: 1, length: 3 }, value => value > 1)).toEqual([3, 2]);
    expect(takeWhile(toArgs([3, 2, 1]), value => value > 1)).toEqual([3, 2]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(takeWhile).toEqualTypeOf<typeof takeWhileLodash>();
  });
});
