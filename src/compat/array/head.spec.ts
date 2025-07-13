import { describe, expect, expectTypeOf, it } from 'vitest';
import { first } from 'es-toolkit/compat';
import { head } from 'es-toolkit/compat';
import type { head as headLodash } from 'lodash';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/head.spec.js#L1
 */
describe('head', () => {
  const array = [1, 2, 3, 4];

  it('should return the first element', () => {
    expect(head(array)).toBe(1);
  });

  it('should work as an iteratee for methods like `map`', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const actual = array.map(head);

    expect(actual).toEqual([1, 4, 7]);
  });

  it('should be aliased', () => {
    expect(first).toBe(head);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(first(null)).toBeUndefined();
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(first(1)).toBeUndefined();
    // @ts-expect-error - invalid argument
    expect(first(true)).toBeUndefined();
  });

  it('should support array-like', () => {
    expect(first({ 0: 1, 1: null, 2: 3, length: 3 })).toEqual(1);
    expect(first('123')).toEqual('1');
    expect(first(args)).toEqual(1);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(head).toEqualTypeOf<typeof headLodash>();
  });
});
