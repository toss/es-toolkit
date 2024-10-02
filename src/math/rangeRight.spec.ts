import { describe, expect, it } from 'vitest';
import { rangeRight } from './rangeRight';

describe('rangeRight', () => {
  it('returns 3, 2, 1, 0 for rangeRight 0 to 4', () => {
    expect(rangeRight(4)).toEqual([3, 2, 1, 0]);
    expect(rangeRight(0, 4)).toEqual([3, 2, 1, 0]);
  });

  it('returns an empty array for rangeRight 0 to -4', () => {
    expect(rangeRight(-4)).toEqual([]);
    expect(rangeRight(0, -4)).toEqual([]);
  });

  it('can have positive step', () => {
    expect(rangeRight(0, 20, 5)).toEqual([15, 10, 5, 0]);
  });

  it('returns an empty array when the step is negative', () => {
    expect(rangeRight(0, 4, -1)).toEqual([]);
  });

  it('throws an error when step is zero', () => {
    expect(() => rangeRight(1, 4, 0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: The step value must be a non-zero integer.]`
    );
  });

  it('returns an empty array when for rangeRight 0 to 0', () => {
    expect(rangeRight(0)).toEqual([]);
  });
});
