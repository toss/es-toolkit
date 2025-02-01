import { describe, expect, it } from 'vitest';
import { fill } from './fill';

describe('fill', () => {
  it('(non-curried) should fill the entire array with the specified value', () => {
    expect(fill<number, string>([1, 2, 3], 'a')).toEqual(['a', 'a', 'a']);
    expect(fill(Array(3), 2)).toEqual([2, 2, 2]);
  });

  it('(curried) should fill the entire array with the specified value', () => {
    expect(fill<number, string>('a')([1, 2, 3])).toEqual(['a', 'a', 'a']);
    expect(fill(2)(Array(3))).toEqual([2, 2, 2]);
  });

  it('(non-curried) should fill part of an array from start to end index', () => {
    expect(fill([4, 6, 8, 10], '*', 1, 3)).toEqual([4, '*', '*', 10]);
    expect(fill([1, 2, 3, 4, 5], '*', 1, 4)).toEqual([1, '*', '*', '*', 5]);
  });

  it('(curried) should fill part of an array from start to end index', () => {
    expect(fill<number, string>('*', 1, 3)([4, 6, 8, 10])).toEqual([4, '*', '*', 10]);
    expect(fill<number, string>('*', 1, 4)([1, 2, 3, 4, 5])).toEqual([1, '*', '*', '*', 5]);
  });

  it('(non-curried) should fill from specified start position', () => {
    expect(fill([1, 2, 3, 4, 5], '*', 2)).toEqual([1, 2, '*', '*', '*']);
  });

  it('(curried) should fill from specified start position', () => {
    expect(fill<number, string>('*', 2)([1, 2, 3, 4, 5])).toEqual([1, 2, '*', '*', '*']);
  });

  it('(non-curried) should fill with negative start position', () => {
    expect(fill([1, 2, 3, 4, 5], '*', -3)).toEqual([1, 2, '*', '*', '*']);
  });

  it('(curried) should fill with negative start position', () => {
    expect(fill<number, string>('*', -3)([1, 2, 3, 4, 5])).toEqual([1, 2, '*', '*', '*']);
  });

  it('(non-curried) should fill with positive start and negative end positions', () => {
    expect(fill([1, 2, 3, 4, 5], '*', 1, -1)).toEqual([1, '*', '*', '*', 5]);
  });

  it('(curried) should fill with positive start and negative end positions', () => {
    expect(fill<number, string>('*', 1, -1)([1, 2, 3, 4, 5])).toEqual([1, '*', '*', '*', 5]);
  });

  it('(non-curried) should fill with both negative start and end positions', () => {
    expect(fill([1, 2, 3, 4, 5], '*', -4, -1)).toEqual([1, '*', '*', '*', 5]);
  });

  it('(curried) should fill with both negative start and end positions', () => {
    expect(fill<number, string>('*', -4, -1)([1, 2, 3, 4, 5])).toEqual([1, '*', '*', '*', 5]);
  });

  it('(non-curried) should not fill if start is greater than end', () => {
    expect(fill([1, 2, 3, 4, 5], '*', 3, 2)).toEqual([1, 2, 3, 4, 5]);
  });

  it('(curried) should not fill if start is greater than end', () => {
    expect(fill<number, string>('*', 3, 2)([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
});
