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
});
