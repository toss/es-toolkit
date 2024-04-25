import { describe, expect, it } from 'vitest';
import { differenceWith } from './differenceWith';

describe('differenceWith', () => {
  it('should the difference of two arrays using the `areItemsEqual` function', () => {
    expect(differenceWith([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y))).toEqual([2.3, 3.4]);
  });
});
