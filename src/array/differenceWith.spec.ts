import { describe, expect, it } from 'vitest';
import { differenceWith } from './differenceWith';

describe('differenceWith', () => {
  it('should return the difference of two arrays using the `areItemsEqual` function', () => {
    expect(differenceWith([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y))).toEqual([2.3, 3.4]);

    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];

    expect(differenceWith(array1, array2, (a, b) => a.id === b.id)).toEqual([{ id: 1 }, { id: 3 }]);
  });
});
