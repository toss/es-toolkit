import { describe, expect, it } from 'vitest';
import { uniq } from './uniq';

describe('uniq', () => {
  it('uniq function creates unique elements from the array passed as an argument.', () => {
    expect(uniq([11, 2, 3, 44, 11, 2, 3])).toEqual([11, 2, 3, 44]);
  });
  it('uniq function works with strings.', () => {
    expect(uniq(['a', 'b', 'b', 'c', 'a'])).toEqual(['a', 'b', 'c']);
  });
  it('uniq function works with boolean values.', () => {
    expect(uniq([true, false, true, false, false])).toEqual([true, false]);
  });
  it('uniq function works with nullish values.', () => {
    expect(uniq([null, undefined, null, undefined])).toEqual([null, undefined]);
  });
  it('uniq function works with empty arrays.', () => {
    expect(uniq([])).toEqual([]);
  });
  it('uniq function works with multiple types.', () => {
    expect(uniq([1, 'a', 2, 'b', 1, 'a'])).toEqual([1, 'a', 2, 'b']);
  });
  it('uniq function keeps its original order.', () => {
    expect(uniq([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  it('uniq function should create a new array.', () => {
    const array = [1, 2, 3];
    const result = uniq(array);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });
  it('uniq function should not mutate the original array.', () => {
    const array = [1, 2, 3, 2, 1, 3];
    uniq(array);

    expect(array).toEqual([1, 2, 3, 2, 1, 3]);
  });
});
