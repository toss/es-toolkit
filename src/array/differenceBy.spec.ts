import { describe, expect, it } from 'vitest';
import { differenceBy } from './differenceBy';

describe('differenceBy', () => {
  it('should the difference of two arrays using the `mapper` function', () => {
    expect(differenceBy([1.2, 2.3, 3.4], [1.2], Math.floor)).toEqual([2.3, 3.4]);
    expect(differenceBy([], [1.2], Math.floor)).toEqual([]);
  });

  it('should return the difference of two arrays with different element types using the `mapper` function', () => {
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

    const result = differenceBy(array1, array2, value => value.id);
    expect(result).toEqual([
      { id: 1, csv: 1 },
      { id: 3, csv: 1 },
    ]);
  });
});
