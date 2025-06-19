import { describe, expect, expectTypeOf, it } from 'vitest';
import type { last as lastLodash } from 'lodash';
import { args } from '../_internal/args';
import { last } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/last.spec.js#L1
 */
describe('last', () => {
  const array = [1, 2, 3, 4];

  it('should return the last element', () => {
    expect(last(array)).toBe(4);
  });

  it('should return `undefined` when querying empty arrays', () => {
    const array: number[] = [];
    array['-1'] = 1;

    expect(last([])).toBe(undefined);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(last);

    expect(actual).toEqual([3, 6, 9]);
  });

  it('should return `undefined` when the collection is null or undefined', () => {
    expect(last(null)).toBe(undefined);
  });

  it('should return `undefined` when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(last(1)).toBe(undefined);
    // @ts-expect-error - invalid argument
    expect(last(true)).toBe(undefined);
  });

  it('should support array-like', () => {
    expect(last({ 0: 1, 1: 2, 2: 3, length: 3 })).toBe(3);
    expect(last('123')).toBe('3');
    expect(last(args)).toBe(3);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(last).toEqualTypeOf<typeof lastLodash>();
  });
});
