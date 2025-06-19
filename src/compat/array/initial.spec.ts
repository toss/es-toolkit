import { describe, expect, expectTypeOf, it } from 'vitest';
import type { initial as initialLodash } from 'lodash';
import { initial } from './initial';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/initial.spec.js#L1
 */
describe('initial', () => {
  const array = [1, 2, 3];

  it('should exclude last element', () => {
    expect(initial(array)).toEqual([1, 2]);
  });

  it('should return an empty when querying empty arrays', () => {
    expect(initial([])).toEqual([]);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(initial);

    expect(actual).toEqual([
      [1, 2],
      [4, 5],
      [7, 8],
    ]);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(initial(null)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(initial(1)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(initial(true)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(initial({ 0: 1, 1: null, 2: 3, length: 3 })).toEqual([1, null]);
    expect(initial('123')).toEqual(['1', '2']);
    expect(initial(args)).toEqual([1, 2]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(initial).toEqualTypeOf<typeof initialLodash>();
  });
});
