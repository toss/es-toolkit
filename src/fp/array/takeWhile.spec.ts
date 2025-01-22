import { describe, expect, it } from 'vitest';
import { takeWhile } from './takeWhile';

// adjust the import path as necessary

describe('takeWhile', () => {
  it(
    "(non-curried) should return elements while the predicate is true",
    () => {
      const arr = [1, 2, 3, 4, 5];
      const result = takeWhile(arr, x => x < 4);
      expect(result).toEqual([1, 2, 3]);
    }
  );

  it("(curried) should return elements while the predicate is true", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = takeWhile<number>(x => x < 4)(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it(
    "(non-curried) should return an empty array if the first element does not satisfy the predicate",
    () => {
      const arr = [1, 2, 3, 4, 5];
      const result = takeWhile(arr, x => x > 4);
      expect(result).toEqual([]);
    }
  );

  it("(curried) should return an empty array if the first element does not satisfy the predicate", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = takeWhile<number>(x => x > 4)(arr);
    expect(result).toEqual([]);
  });

  it(
    "(non-curried) should return all elements if all satisfy the predicate",
    () => {
      const arr = [1, 2, 3];
      const result = takeWhile(arr, x => x < 4);
      expect(result).toEqual([1, 2, 3]);
    }
  );

  it("(curried) should return all elements if all satisfy the predicate", () => {
    const arr = [1, 2, 3];
    const result = takeWhile<number>(x => x < 4)(arr);
    expect(result).toEqual([1, 2, 3]);
  });

  it(
    "(non-curried) should return an empty array if the input array is empty",
    () => {
      const arr: number[] = [];
      const result = takeWhile(arr, x => x < 4);
      expect(result).toEqual([]);
    }
  );

  it("(curried) should return an empty array if the input array is empty", () => {
    const arr: number[] = [];
    const result = takeWhile<number>(x => x < 4)(arr);
    expect(result).toEqual([]);
  });

  it("(non-curried) should handle complex predicate functions", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const result = takeWhile(arr, item => item.id < 3);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("(curried) should handle complex predicate functions", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const result = takeWhile<{ id: number }>(item => item.id < 3)(arr);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
