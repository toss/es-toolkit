import { describe, expect, it, expectTypeOf } from 'vitest';
import type { uniq as uniqLodash } from 'lodash';
import { args } from '../_internal/args';
import { uniq } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/uniq.spec.js#L1
 */
describe('uniq', () => {
  it('should perform an unsorted uniq when used as an iteratee for methods like `map`', () => {
    const array = [
      [2, 1, 2],
      [1, 2, 1],
    ];
    const actual = array.map(uniq);

    expect(actual).toEqual([
      [2, 1],
      [1, 2],
    ]);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(uniq(null)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(uniq(1)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(uniq(true)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(uniq({ 0: 1, 1: 2, 2: 1, length: 3 })).toEqual([1, 2]);
    expect(uniq('112')).toEqual(['1', '2']);
    expect(uniq(args)).toEqual([1, 2, 3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(uniq).toEqualTypeOf<typeof uniqLodash>();
  });
});
