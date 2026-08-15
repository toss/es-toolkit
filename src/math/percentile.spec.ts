import { describe, expect, it } from 'vitest';
import { percentile } from './percentile';

describe('percentile', () => {
  it('returns the smallest value at the 0th percentile', () => {
    expect(percentile([5, 1, 4, 2, 3], 0)).toBe(1);
  });

  it('returns the largest value at the 100th percentile', () => {
    expect(percentile([5, 1, 4, 2, 3], 100)).toBe(5);
  });

  it('returns the middle value at the 50th percentile of an odd-length array', () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
  });

  it('returns the correct value at the 25th, 50th, and 75th percentiles', () => {
    const list = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(percentile(list, 25)).toBe(25);
    expect(percentile(list, 50)).toBe(50);
    expect(percentile(list, 75)).toBe(75);
  });

  it('sorts unsorted input before computing the percentile', () => {
    const list = [50, 10, 30, 20, 40];
    expect(percentile(list, 50)).toBe(30);
  });

  it('handles negative numbers', () => {
    expect(percentile([-1, -2, -3, -4, -5], 50)).toBe(-3);
    expect(percentile([7, 6, -1, -2, -3, -4, -5], 50)).toBe(-2);
  });

  it('treats NaN values as the smallest values when sorting', () => {
    expect(percentile([NaN, NaN, 1, 100], 75)).toBe(1);
    expect(percentile([1, 100, NaN, NaN], 75)).toBe(1);
  });

  it('does not mutate the input array', () => {
    const list = [5, 1, 4, 2, 3];
    percentile(list, 50);
    expect(list).toEqual([5, 1, 4, 2, 3]);
  });

  it('returns NaN for an empty array', () => {
    expect(percentile([], 50)).toBeNaN();
  });

  it('throws when percentile is NaN', () => {
    expect(() => percentile([1, 2, 3], Number.NaN)).toThrow();
  });

  it('throws when percentile is less than 0', () => {
    expect(() => percentile([1, 2, 3], -1)).toThrow();
  });

  it('throws when percentile is greater than 100', () => {
    expect(() => percentile([1, 2, 3], 101)).toThrow();
  });
});
