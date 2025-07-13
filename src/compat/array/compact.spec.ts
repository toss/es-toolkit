import { describe, expect, expectTypeOf, it } from 'vitest';
import { compact } from 'es-toolkit/compat';
import type { compact as compactLodash } from 'lodash';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/compact.spec.js#L1
 */
describe('compact', () => {
  it('should filter falsey values', () => {
    const array = ['0', '1', '2'];
    expect(compact(falsey.concat(array))).toEqual(array);
  });

  it('should return an empty array when the collection is null or undefined', () => {
    expect(compact(null)).toEqual([]);
  });

  it('should return an empty array when the collection is not array-like', () => {
    // @ts-expect-error - invalid argument
    expect(compact(1)).toEqual([]);
    // @ts-expect-error - invalid argument
    expect(compact(true)).toEqual([]);
  });

  it('should support array-like', () => {
    expect(compact({ 0: 1, 1: null, 2: 3, length: 3 })).toEqual([1, 3]);
    expect(compact('123')).toEqual(['1', '2', '3']);
    expect(compact(args)).toEqual([1, 2, 3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(compact).toEqualTypeOf<typeof compactLodash>();
  });
});
