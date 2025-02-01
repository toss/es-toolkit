import { describe, expect, it } from 'vitest';
import { differenceWith } from './differenceWith';

describe('differenceWith', () => {
  it('should compute the difference using the comparator function', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const comparator = (a: { x: number }, b: { x: number }) => a.x === b.x;

    expect(differenceWith(arr, [{ x: 1 }, { x: 2 }], comparator)).toEqual([{ x: 3 }]);
    expect(differenceWith([{ x: 1 }, { x: 2 }], comparator)(arr)).toEqual([{ x: 3 }]);
  });

  it('should work with number arrays', () => {
    const arr = [1.1, 2.2, 3.3];
    const comparator = (a: number, b: number) => Math.floor(a) === Math.floor(b);

    expect(differenceWith(arr, [1.9, 2.8], comparator)).toEqual([3.3]);
    expect(differenceWith([1.9, 2.8], comparator)(arr)).toEqual([3.3]);
  });

  it('should not modify the original array', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const arr2 = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const comparator = (a: { x: number }, b: { x: number }) => a.x === b.x;

    differenceWith(arr, [{ x: 1 }], comparator);
    differenceWith([{ x: 1 }], comparator)(arr2);

    expect(arr).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
    expect(arr2).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
  });
});
