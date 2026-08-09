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

  it('stays exact beyond Number.MAX_SAFE_INTEGER', () => {
    expect(sum([9007199254740993n, 9007199254740993n])).toBe(18014398509481986n);
  });

  it('ensures that adding the sums of two arrays equals the sum of their concatenation', () => {
    const array1: bigint[] = [];
    const array2 = [1n, 2n, 3n, 4n];

    expect(sum(array1) + sum(array2)).toBe(sum([...array1, ...array2]));
  });
});
