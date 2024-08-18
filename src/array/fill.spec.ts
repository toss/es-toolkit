import { describe, expect, it } from 'vitest';
import { fill } from './fill';

describe('fill', () => {
  it('fills the entire array with the specified value', () => {
    const array = [1, 2, 3];
    expect(fill(array, 'a')).toEqual(['a', 'a', 'a']);
  });

  it('fills a new array with a specified value', () => {
    expect(fill(Array(3), 2)).toEqual([2, 2, 2]);
  });

  it('fills part of an array from the start index to the end index', () => {
    expect(fill([4, 6, 8, 10], '*', 1, 3)).toEqual([4, '*', '*', 10]);
  });

  it('fills middle values', () => {
    const result = fill([1, 2, 3, 4, 5], '*', 1, 4);
    expect(result).toEqual([1, '*', '*', '*', 5]);
  });

  it('fills from specified start position', () => {
    const result = fill([1, 2, 3, 4, 5], '*', 2);
    expect(result).toEqual([1, 2, '*', '*', '*']);
  });

  it('fills with negative start position', () => {
    const result = fill([1, 2, 3, 4, 5], '*', -3);
    expect(result).toEqual([1, 2, '*', '*', '*']);
  });

  it('fills with positive start and negative end positions', () => {
    const result = fill([1, 2, 3, 4, 5], '*', 1, -1);
    expect(result).toEqual([1, '*', '*', '*', 5]);
  });

  it('fills with both negative start and end positions', () => {
    const result = fill([1, 2, 3, 4, 5], '*', -4, -1);
    expect(result).toEqual([1, '*', '*', '*', 5]);
  });
});
