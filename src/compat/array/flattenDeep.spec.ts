import { describe, expect, expectTypeOf, it } from 'vitest';
import type { flattenDeep as flattenDeepLodash } from 'lodash';
import { flattenDeep } from './flattenDeep';
import { args } from '../_internal/args';

describe('flattenDeep', () => {
  it('should flattenDeep `arguments` objects', () => {
    const array = [args, [args]];
    const expected = [1, 2, 3, 1, 2, 3];
    const actual = flattenDeep(array);

    expect(actual).toEqual(expected);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array(3)];
    const expected = [1, 2, 3, undefined, undefined, undefined];
    const actual = flattenDeep(array);

    expect(actual).toEqual(expected);
    expect('4' in actual).toBeTruthy();
  });

  it('should flattenDeep objects with a truthy `Symbol.isConcatSpreadable` value', () => {
    const object = { 0: 'a', length: 1, [Symbol.isConcatSpreadable]: true };
    const array = [object];
    const expected = ['a'];
    const actual = flattenDeep(array);
    expect(actual).toEqual(expected);
  });

  it('should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]];
    const expected: [] = [];
    const actual = flattenDeep(array);

    expect(actual).toEqual(expected);
  });

  it('should support flattening of nested arrays', () => {
    const array = [1, [2, [3, [4]], 5]];
    const expected = [1, 2, 3, 4, 5];
    const actual = flattenDeep(array);

    expect(actual).toEqual(expected);
  });

  it('should return an empty array for non array-like objects', () => {
    const nonArray = { 0: 'a' };
    const expected: [] = [];
    const actual = flattenDeep(nonArray as any);

    expect(actual).toEqual(expected);
  });

  it('should support array-like', () => {
    expect(flattenDeep({ 0: [1, 2, [3]], length: 1 })).toEqual([1, 2, 3]);
    expect(flattenDeep('123')).toEqual(['1', '2', '3']);
    expect(flattenDeep(args)).toEqual([1, 2, 3]);
  });

  it('should match the type of lodash', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(flattenDeep).toEqualTypeOf<typeof flattenDeepLodash>();
  });
});
