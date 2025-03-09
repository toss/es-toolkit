import { describe, expect, it } from 'vitest';
import { at } from './at';

describe('at', () => {
  it('(non-curried) should return the elements corresponding to the specified keys', () => {
    expect(at<string>(['a', 'b', 'c'], [0, 2])).toEqual(['a', 'c']);
    expect(at<string>(['a', 'b', 'c'], [2, 0])).toEqual(['c', 'a']);
  });

  it('(curried) should return the elements corresponding to the specified keys', () => {
    expect(at<string>([0, 2])(['a', 'b', 'c'])).toEqual(['a', 'c']);
    expect(at<string>([2, 0])(['a', 'b', 'c'])).toEqual(['c', 'a']);
  });

  it('(non-curried) should support negative indices', () => {
    expect(at<string>(['a', 'b', 'c'], [-1, -2])).toEqual(['c', 'b']);
    expect(at<string>(['a', 'b', 'c'], [-2, -1])).toEqual(['b', 'c']);
  });

  it('(curried) should support negative indices', () => {
    expect(at<string>([-1, -2])(['a', 'b', 'c'])).toEqual(['c', 'b']);
    expect(at<string>([-2, -1])(['a', 'b', 'c'])).toEqual(['b', 'c']);
  });

  it('(non-curried) should return `undefined` for nonexistent keys', () => {
    expect(at<string>(['a', 'b', 'c'], [2, 4, 0])).toEqual(['c', undefined, 'a']);
  });

  it('(curried) should return `undefined` for nonexistent keys', () => {
    expect(at<string>([2, 4, 0])(['a', 'b', 'c'])).toEqual(['c', undefined, 'a']);
  });

  it('(non-curried) should return an empty array when no keys are given', () => {
    expect(at<string>(['a', 'b', 'c'], [])).toEqual([]);
  });

  it('(curried) should return an empty array when no keys are given', () => {
    expect(at<string>([])(['a', 'b', 'c'])).toEqual([]);
  });
});
