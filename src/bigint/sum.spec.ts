import { describe, expect, it } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('calculates the sum of an array of bigints', () => {
    expect(sum([1n, 2n, 3n, 4n])).toBe(10n);
  });

  it('returns 0n for an empty array', () => {
    expect(sum([])).toBe(0n);
  });

  it('handles arrays with negative bigints', () => {
    expect(sum([-1n, -2n, -3n, 4n])).toBe(-2n);
  });

  it('handles values beyond Number.MAX_SAFE_INTEGER without precision loss', () => {
    expect(sum([9007199254740993n, 9007199254740993n])).toBe(18014398509481986n);
  });
});
