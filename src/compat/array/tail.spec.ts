import { describe, expect, expectTypeOf, it } from 'vitest';
import type { tail as tailLodash } from 'lodash';
import { args } from '../_internal/args';
import { tail } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/tail.spec.js#L1
 */
describe('tail', () => {
  const array = [1, 2, 3];

  it('should exclude the first element', () => {
    expect(tail(array)).toEqual([2, 3]);
  });

  it('should return an empty when querying empty arrays', () => {
    expect(tail([])).toEqual([]);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(tail);

    expect(actual).toEqual([
      [2, 3],
      [5, 6],
      [8, 9],
    ]);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(tail(null)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(tail(1)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(tail(true)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(tail({ 0: 1, 1: null, 2: 3, length: 3 })).toEqual([null, 3]);
    expect(tail('123')).toEqual(['2', '3']);
    expect(tail(args)).toEqual([2, 3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(tail).toEqualTypeOf<typeof tailLodash>();
  });
});
