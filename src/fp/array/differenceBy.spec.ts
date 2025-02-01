import { describe, expect, it } from 'vitest';
import { differenceBy } from './differenceBy';

describe('differenceBy', () => {
  it('should compute the difference using the mapper function', () => {
    const arr = [2.1, 1.2, 3.3];
    expect(differenceBy(arr, [2.1, 1.2], Math.floor)).toEqual([3.3]);
    expect(differenceBy([2.1, 1.2], Math.floor)(arr)).toEqual([3.3]);
  });

  it('should work with object arrays', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    expect(differenceBy(arr, [{ x: 1 }, { x: 2 }], obj => obj.x)).toEqual([{ x: 3 }]);
    expect(differenceBy([{ x: 1 }, { x: 2 }], obj => obj.x)(arr)).toEqual([{ x: 3 }]);
  });

  it('should not modify the original array', () => {
    const arr = [2.1, 1.2, 3.3];
    const arr2 = [2.1, 1.2, 3.3];

    differenceBy(arr, [2.1], Math.floor);
    differenceBy([2.1], Math.floor)(arr2);

    expect(arr).toEqual([2.1, 1.2, 3.3]);
    expect(arr2).toEqual([2.1, 1.2, 3.3]);
  });
});
