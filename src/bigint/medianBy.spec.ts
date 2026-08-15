import { describe, expect, it } from 'vitest';
import { medianBy } from './medianBy';

describe('medianBy', () => {
  it('returns the median of the mapped bigints', () => {
    const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];

    expect(medianBy(accounts, account => account.balance)).toBe(20n);
  });

  it('truncates the average toward zero for an even-length array', () => {
    const accounts = [{ balance: 1n }, { balance: 2n }, { balance: 3n }, { balance: 4n }];

    expect(medianBy(accounts, account => account.balance)).toBe(2n);
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => medianBy([], () => 0n)).toThrowError(new RangeError('Cannot compute the median of an empty array.'));
  });
});
