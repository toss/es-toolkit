import { describe, expect, expectTypeOf, it } from 'vitest';
import { take } from 'es-toolkit/compat';
import type { take as takeLodash } from 'lodash';
import { args } from '../_internal/args';

describe('take', () => {
  const array = [1, 2, 3];

  it('should take the first element when `n` is not provided', () => {
    expect(take(array)).toEqual([1]);
  });

  it('should take the first two elements', () => {
    expect(take(array, 2)).toEqual([1, 2]);
  });

  it('should return an empty array when `n` < `1`', () => {
    [0, -1, -Infinity].forEach(n => {
      expect(take(array, n)).toEqual([]);
    });
  });

  it('should return all elements when `n` >= `length`', () => {
    [3, 4, 2 ** 32, Infinity].forEach(n => {
      expect(take(array, n)).toEqual(array);
    });
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(take(null)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(take(1)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(take(true)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(take({ 0: 1, 1: 2, 2: 3, length: 3 }, 2)).toEqual([1, 2]);
    expect(take('123', 2)).toEqual(['1', '2']);
    expect(take(args, 2)).toEqual([1, 2]);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    expect([[1, 2], [3, 4], [5]].map(take)).toEqual([[1], [3], [5]]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(take).toEqualTypeOf<typeof takeLodash>();
  });
});
