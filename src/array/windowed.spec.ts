import { describe, expect, it } from 'vitest';
import { windowed } from './windowed';

describe('windowed', () => {
  it('should return a list of overlapping consecutive pairs', () => {
    expect(windowed([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
  });

  it('should return a list of overlapping windows of the given size with given offsets', () => {
    expect(windowed([1, 2, 3, 4, 5, 6], 3, 2)).toEqual([
      [1, 2, 3],
      [3, 4, 5],
    ]);
  });

  it('should return a list of non-overlapping windows of the given size', () => {
    expect(windowed([1, 2, 3, 4, 5, 6], 3, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('should return a list of partial with partial windows of smaller size', () => {
    expect(windowed([1, 2, 3, 4, 5, 6], 3, 2, { partialWindows: true })).toEqual([
      [1, 2, 3],
      [3, 4, 5],
      [5, 6],
    ]);
  });

  it('should behave like chunked when size equals step', () => {
    expect(windowed([1, 2, 3, 4, 5, 6], 3, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('should skip elements when step is greater than size', () => {
    expect(windowed([1, 2, 3, 4, 5, 6], 2, 4)).toEqual([
      [1, 2],
      [5, 6],
    ]);
  });

  it('should properly handle step bigger than array', () => {
    expect(windowed([1, 2, 3, 4, 5, 6], 2, 10)).toEqual([[1, 2]]);
  });

  it('should return an empty array when the input array is empty', () => {
    expect(windowed([], 3)).toEqual([]);
  });

  it('should throw error on invalid size or step', () => {
    expect(() => windowed([1, 2, 3], 0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be a positive integer.]`
    );
    expect(() => windowed([1, 2, 3], 1, 0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Step must be a positive integer.]`
    );
    expect(() => windowed([1, 2, 3], -1)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be a positive integer.]`
    );
    expect(() => windowed([1, 2, 3], 0.5)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be a positive integer.]`
    );
    expect(() => windowed([1, 2, 3], 1, -1)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Step must be a positive integer.]`
    );
    expect(() => windowed([1, 2, 3], 1, 0.5)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Step must be a positive integer.]`
    );
  });
});
