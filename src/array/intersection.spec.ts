import { describe, expect, it } from 'vitest';
import { intersection } from './intersection';

describe('intersection', () => {
  it('should return the intersection of two arrays', () => {
    expect(intersection([1, 2], [1, 3])).toEqual([1]);
    expect(intersection([1, 2], [3, 1])).toEqual([1]);
    expect(intersection([1, 2], [3, 4])).toEqual([]);
    expect(intersection([], [1, 2])).toEqual([]);
  });
})