import { describe, expect, it } from 'vitest';
import { forEachRight } from './forEachRight';

describe('forEachRight', () => {
  it("(non-curried) should iterate over elements from right to left", () => {
    const array = [1, 2, 3];
    const result: number[] = [];

    forEachRight(array, value => {
      result.push(value);
    });

    expect(result).toEqual([3, 2, 1]);
  });

  it("(curried) should iterate over elements from right to left", () => {
    const array = [1, 2, 3];
    const result: number[] = [];

    forEachRight(value => {
      result.push(value);
    })(array);

    expect(result).toEqual([3, 2, 1]);
  });

  it("(non-curried) should provide correct index and array for arrays", () => {
    const array = [1, 2, 3];
    const indices: number[] = [];
    const arrays: number[][] = [];

    forEachRight(array, (_, index, arr) => {
      indices.push(index);
      arrays.push(arr);
    });

    expect(indices).toEqual([2, 1, 0]);
    expect(arrays).toEqual([array, array, array]);
  });

  it("(curried) should provide correct index and array for arrays", () => {
    const array = [1, 2, 3];
    const indices: number[] = [];
    const arrays: number[][] = [];

    forEachRight((_, index, arr) => {
      indices.push(index);
      arrays.push(arr);
    })(array);

    expect(indices).toEqual([2, 1, 0]);
    expect(arrays).toEqual([array, array, array]);
  });

  it("(non-curried) should handle an empty array", () => {
    const array: number[] = [];
    const result: number[] = [];

    forEachRight(array, value => {
      result.push(value);
    });

    expect(result).toEqual([]);
  });

  it("(curried) should handle an empty array", () => {
    const array: number[] = [];
    const result: number[] = [];

    forEachRight(value => {
      result.push(value);
    })(array);

    expect(result).toEqual([]);
  });
});
