import { describe, expect, it } from 'vitest';
import { sampleSize } from './sampleSize';

describe('sampleSize', () => {
  it(
    "(non-curried) returns a sample element array of a specified size",
    () => {
      const array = [1, 2, 3];
      const result = sampleSize(array, 2);

      expect(array).toEqual(expect.arrayContaining(result));
    }
  );

  it("(curried) returns a sample element array of a specified size", () => {
    const array = [1, 2, 3];
    const result = sampleSize(2)(array);

    expect(array).toEqual(expect.arrayContaining(result));
  });

  it("(non-curried) returns an empty array for size 0", () => {
    const result = sampleSize([1, 2, 3], 0);
    expect(result).toEqual([]);
  });

  it("(curried) returns an empty array for size 0", () => {
    const result = sampleSize(0)([1, 2, 3]);
    expect(result).toEqual([]);
  });

  it(
    "(non-curried) returns the same array if the size is equal to the array length",
    () => {
      const array = [1, 2, 3];
      const result = sampleSize(array, array.length);

      expect(result).toEqual(array);
      expect(result).not.toBe(array);
    }
  );

  it("(curried) returns the same array if the size is equal to the array length", () => {
    const array = [1, 2, 3];
    const result = sampleSize(array.length)(array);

    expect(result).toEqual(array);
    expect(result).not.toBe(array);
  });

  it(
    "(non-curried) throws an error if the size is greater than the array length",
    () => {
      expect(() => sampleSize([1, 2, 3], 4)).toThrowErrorMatchingInlineSnapshot(
        `[Error: Size must be less than or equal to the length of array.]`
      );
    }
  );

  it("(curried) throws an error if the size is greater than the array length", () => {
    expect(() => sampleSize(4)([1, 2, 3])).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be less than or equal to the length of array.]`
    );
  });
});
