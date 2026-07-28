import { describe, expect, it } from 'vitest';
import { sumBy } from './sumBy';

describe('sumBy', () => {
  it('calculates the sum of the mapped bigints', () => {
    const accounts = [{ balance: 10n }, { balance: 20n }, { balance: 30n }];

    expect(sumBy(accounts, account => account.balance)).toBe(60n);
  });

  it('returns 0n for an empty array', () => {
    expect(sumBy([], () => 1n)).toBe(0n);
  });

  it('passes the index to getValue', () => {
    expect(sumBy(['a', 'b', 'c'], (_, index) => BigInt(index))).toBe(3n);
  });

  it('handles negative bigints', () => {
    expect(sumBy([{ value: -5n }, { value: 3n }], item => item.value)).toBe(-2n);
  });
});
