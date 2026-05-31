import { describe, expect, it } from 'vitest';
import { mean } from './mean';

describe('mean', () => {
  it('calculates the average of an array of bigints', () => {
    expect(mean([1n, 2n, 3n, 4n, 5n])).toBe(3n);
  });

  it('truncates toward zero', () => {
    expect(mean([1n, 2n])).toBe(1n);
    expect(mean([-1n, -2n])).toBe(-1n);
  });

  it('returns undefined for an empty array', () => {
    expect(mean([])).toBeUndefined();
  });
});
