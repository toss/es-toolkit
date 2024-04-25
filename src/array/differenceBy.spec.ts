import { describe, expect, it } from 'vitest';
import { differenceBy } from './differenceBy';

describe('differenceBy', () => {
  it('should the difference of two arrays using the `mapper` function', () => {
    expect(differenceBy([1.2, 2.3, 3.4], [1.2], Math.floor)).toEqual([2.3, 3.4]);
    expect(differenceBy([], [1.2], Math.floor)).toEqual([]);
  });
});
