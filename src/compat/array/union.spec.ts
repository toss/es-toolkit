import { describe, expect, it } from 'vitest';
import { union } from './union';
import { args } from '../_internal/args';

describe('union', () => {
  it('should return the union of two arrays', () => {
    const actual = union([2], [1, 2]);
    expect(actual).toEqual([2, 1]);
  });

  it('should return the union of multiple arrays', () => {
    const actual = union([2], [1, 2], [2, 3]);
    expect(actual).toEqual([2, 1, 3]);
  });

  it('should not flatten nested arrays', () => {
    const actual = union([1, 3, 2], [1, [5]], [2, [4]]);
    expect(actual).toEqual([1, 3, 2, [5], [4]]);
  });

  it('should ignore values that are not arrays or arguments objects', () => {
    const array = [0];
    // eslint-disable-next-line
    // @ts-ignore
    expect(union(array, 3, { '0': 1 }, null)).toEqual(array);
    expect(union(null, array, null, [2, 1])).toEqual([0, 2, 1]);
    expect(union(array, null, args, null)).toEqual([0, 1, 2, 3]);
  });
});
