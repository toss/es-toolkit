import { describe, expect, it } from 'vitest';
import { minBy } from './minBy';

describe('minBy', () => {
  it('returns the element with the smallest mapped bigint', () => {
    const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];

    expect(minBy(accounts, account => account.balance)).toEqual({ balance: 10n });
  });

  it('returns the first element when several tie', () => {
    const first = { balance: 10n };
    const second = { balance: 10n };

    expect(minBy([first, second], account => account.balance)).toBe(first);
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => minBy([], () => 0n)).toThrowError(new RangeError('Cannot find the minimum of an empty array.'));
  });
});
