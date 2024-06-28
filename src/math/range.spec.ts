import { describe, expect, it } from 'vitest';
import { range } from './range';

describe('range', () => {
  it('returns 0, 1, 2, 3 for range 0 to 4', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(0, 4)).toEqual([0, 1, 2, 3]);
  });

  it('returns an empty array for range 0 to -4', () => {
    expect(range(-4)).toEqual([]);
    expect(range(0, -4)).toEqual([]);
  });

  it('can have positive step', () => {
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it('returns an empty array when the step is negative', () => {
    expect(range(0, 4, -1)).toEqual([]);
  });

  it('throws an error when step is zero', () => {
    expect(() => range(1, 4, 0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: The step value must be a non-zero integer.]`
    );
  });

  it('returns an empty array when for range 0 to 0', () => {
    expect(range(0)).toEqual([]);
  });
});
