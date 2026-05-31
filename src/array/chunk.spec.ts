import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { chunk } from './chunk';

describe('chunk', () => {
  it('should return an empty array when the input array is empty', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('should throw if the size is not an integer of is less than 1', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
    expect(() => chunk([1, 2, 3], -1)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
    expect(() => chunk([1, 2, 3], 0.5)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
    expect(() => chunk([1, 2, 3], Math.PI)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
  });

  it('should evenly divide all elements into chunks of the specified size when the total length is a multiple of the size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('should place the remaining elements in the last chunk when the total length is not a multiple of the size', () => {
    expect(chunk([1, 2, 3, 4], 6)).toEqual([[1, 2, 3, 4]]);
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });

  it('should preserve all elements in order across generated inputs', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.integer({ min: 1, max: 50 }), (array, size) => {
        const chunks = chunk(array, size);

        expect(chunks.flat()).toEqual(array);
        expect(chunks.every((item, index) => item.length === size || index === chunks.length - 1)).toBe(true);
        expect(chunks.every(item => item.length > 0 && item.length <= size)).toBe(true);
      })
    );
  });
});
