import { describe, expect, it } from 'vitest';
import { differenceWith } from './differenceWith';

describe('differenceWith', () => {
  it('should return the difference of two arrays using the `areItemsEqual` function', () => {
    expect(differenceWith([1.2, 2.3, 3.4], [1.2], (x, y) => Math.floor(x) === Math.floor(y))).toEqual([2.3, 3.4]);

    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];

    expect(differenceWith(array1, array2, (a, b) => a.id === b.id)).toEqual([{ id: 1 }, { id: 3 }]);
  });

  it('should return the difference of two arrays with different element types using the `areItemsEqual` function', () => {
    type CSV = { id: number; csv: number };
    type JSON = { id: number; json: number };

    const array1: CSV[] = [
      { id: 1, csv: 1 },
      { id: 2, csv: 1 },
      { id: 3, csv: 1 },
    ];
    const array2: JSON[] = [
      { id: 2, json: 2 },
      { id: 4, json: 2 },
    ];

    const result = differenceWith(array1, array2, (a, b) => a.id === b.id);
    expect(result).toEqual([
      { id: 1, csv: 1 },
      { id: 3, csv: 1 },
    ]);
  });

  it('should handle duplicate elements correctly', () => {
    expect(differenceWith([1, 1, 2, 2, 3], [2], (a, b) => a === b)).toEqual([1, 1, 3]);
  });
});
