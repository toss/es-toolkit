import { describe, expect, expectTypeOf, it } from 'vitest';
import { partition } from './partition';

describe('partition', () => {
  it('creates two arrays: the first array includes items for which isInTruthy returns true, and the second array includes items for which isInTruthy returns false.', () => {
    expect(partition([true, true, false], x => x)).toEqual([[true, true], [false]]);
    expect(
      partition(
        [
          { id: 1, enabled: true },
          { id: 2, enabled: false },
          { id: 3, enabled: false },
          { id: 4, enabled: true },
        ],
        x => x.enabled
      )
    ).toEqual([
      [
        { id: 1, enabled: true },
        { id: 4, enabled: true },
      ],
      [
        { id: 2, enabled: false },
        { id: 3, enabled: false },
      ],
    ]);
  });

  it('should correctly infer the type of a narrow array', () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const [evens, odds] = partition(arr, num => num % 2 === 0);

    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);

    expectTypeOf(evens).toEqualTypeOf<Array<1 | 2 | 3 | 4 | 5>>();
    expectTypeOf(odds).toEqualTypeOf<Array<1 | 2 | 3 | 4 | 5>>();
  });

  it('should correctly infer type of a narrow array with a type guard', () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const isOdd = (num: number): num is 1 | 3 | 5 => num % 2 === 1;
    const [odds, evens] = partition(arr, isOdd);

    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);

    expectTypeOf(evens).toEqualTypeOf<Array<2 | 4>>();
    expectTypeOf(odds).toEqualTypeOf<Array<1 | 3 | 5>>();
  });

  it('should pass index to the predicate function', () => {
    const arr = [10, 20, 30, 40, 50];
    const indices: number[] = [];
    const [result] = partition(arr, (value, index) => {
      indices.push(index);
      return index % 2 === 0;
    });

    expect(indices).toEqual([0, 1, 2, 3, 4]);
    expect(result).toEqual([10, 30, 50]);
  });

  it('should pass the array to the predicate function', () => {
    const arr = [1, 2, 3, 4, 5];
    const arrays: Array<readonly number[]> = [];
    const [evens] = partition(arr, (value, index, array) => {
      arrays.push(array);
      return value % 2 === 0;
    });

    expect(evens).toEqual([2, 4]);
    expect(arrays).toHaveLength(5);
    arrays.forEach(array => {
      expect(array).toBe(arr);
    });
  });
});
