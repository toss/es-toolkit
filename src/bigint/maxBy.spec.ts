import { describe, expect, it } from 'vitest';
import { maxBy } from './maxBy';

describe('maxBy', () => {
  it('returns the element with the largest mapped bigint', () => {
    const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];

    expect(maxBy(accounts, account => account.balance)).toEqual({ balance: 30n });
  });

  it('returns the first element when several tie', () => {
    const first = { balance: 30n };
    const second = { balance: 30n };

    expect(maxBy([first, second], account => account.balance)).toBe(first);
  });

  it('passes the index and array to getValue', () => {
    const items = ['a', 'b', 'c'];
    const seen: Array<[string, number, readonly string[]]> = [];

    maxBy(items, (element, index, array) => {
      seen.push([element, index, array]);
      return BigInt(index);
    });

    expect(seen).toEqual([
      ['a', 0, items],
      ['b', 1, items],
      ['c', 2, items],
    ]);
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => maxBy([], () => 0n)).toThrowError(new RangeError('Cannot find the maximum of an empty array.'));
  });
});
