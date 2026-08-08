import { describe, expect, it } from 'vitest';
import { takeRightWhile } from './takeRightWhile';
import { slice } from '../_internal/slice';
import { toArgs } from '../_internal/toArgs';

describe('takeRightWhile', () => {
  const array = [1, 2, 3, 4];

  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];

  it('should take elements while `predicate` returns truthy', () => {
    const actual = takeRightWhile(array, n => n > 2);
    expect(actual).toEqual([3, 4]);
  });

  it('should provide correct `predicate` arguments', () => {
    let args;
    takeRightWhile(array, function () {
      // eslint-disable-next-line prefer-rest-params
      args = slice.call(arguments);
    });
    expect(args).toEqual([4, 3, array]);
  });

  it('should work with `_.matches` shorthands', () => {
    expect(takeRightWhile(objects, { b: 2 })).toEqual(objects.slice(2));
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    expect(takeRightWhile(objects, ['b', 2])).toEqual(objects.slice(2));
  });

  it('should work with `_.property` shorthands', () => {
    expect(takeRightWhile(objects, 'b')).toEqual(objects.slice(1));
  });

  it('should use identity function as default `predicate`', () => {
    expect(takeRightWhile(['a', 'b'])).toEqual(['a', 'b']);
    expect(takeRightWhile([false, true])).toEqual([true]);
  });

  it('should return empty array when `array` is nullable', () => {
    expect(takeRightWhile(null, () => true)).toEqual([]);
    expect(takeRightWhile(undefined, () => true)).toEqual([]);
    expect(takeRightWhile(null)).toEqual([]);
    expect(takeRightWhile(undefined)).toEqual([]);
  });

  it('should work with array-like objects', () => {
    expect(takeRightWhile({ 0: 1, 1: 2, 2: 3, length: 3 }, value => value > 1)).toEqual([2, 3]);
    expect(takeRightWhile(toArgs([1, 2, 3]), value => value > 1)).toEqual([2, 3]);
  });
});
