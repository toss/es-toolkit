import { describe, expect, expectTypeOf, it } from 'vitest';
import type { flattenDepth as flattenDepthLodash } from 'lodash';
import { flattenDepth } from './flattenDepth';
import { args } from '../_internal/args';

describe('flattenDepth', () => {
  it('should flattenDepth `arguments` objects', () => {
    const array = [args, [args]];
    const expected = [1, 2, 3, 1, 2, 3];
    const actual = flattenDepth(array, 2);

    expect(actual).toEqual(expected);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array(3)];
    const expected = [1, 2, 3, undefined, undefined, undefined];
    const actual = flattenDepth(array);

    expect(actual).toEqual(expected);
    expect('4' in actual).toBeTruthy();
  });

  it('should flattenDepth objects with a truthy `Symbol.isConcatSpreadable` value', () => {
    const object = { 0: 'a', length: 1, [Symbol.isConcatSpreadable]: true };
    const array = [object];
    const expected = ['a'];
    const actual = flattenDepth(array);
    expect(actual).toEqual(expected);
  });

  it('should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]];
    const expected = [[[]]];
    const actual = flattenDepth(array, 2);

    expect(actual).toEqual(expected);
  });

  it('should support flattening of nested arrays', () => {
    const array = [1, [2, [3, [4]], 5]];
    const expected = [1, 2, 3, [4], 5];
    const actual = flattenDepth(array, 2);

    expect(actual).toEqual(expected);
  });

  it('should return an empty array for non array-like objects', () => {
    const nonArray = { 0: 'a' };
    const expected: [] = [];
    const actual = flattenDepth(nonArray as any, 2);

    expect(actual).toEqual(expected);
  });

  it('should use a default `depth` of `1`', () => {
    const array = [1, [2, [3, [4]], 5]];
    expect(flattenDepth(array)).toEqual([1, 2, [3, [4]], 5]);
  });

  it('should treat a `depth` of < `1` as a shallow clone', () => {
    const array = [1, [2, [3, [4]], 5]];
    for (const depth of [-1, 0]) {
      expect(flattenDepth(array, depth)).toEqual([1, [2, [3, [4]], 5]]);
    }
  });

  it('should coerce `depth` to an integer', () => {
    const array = [1, [2, [3, [4]], 5]];
    expect(flattenDepth(array, 2.2)).toEqual([1, 2, 3, [4], 5]);
  });

  it('should support array-like', () => {
    expect(flattenDepth({ 0: [1, 2, 3], length: 1 })).toEqual([1, 2, 3]);
    expect(flattenDepth('123')).toEqual(['1', '2', '3']);
    expect(flattenDepth(args)).toEqual([1, 2, 3]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(flattenDepth).toEqualTypeOf<typeof flattenDepthLodash>();
  });
});
