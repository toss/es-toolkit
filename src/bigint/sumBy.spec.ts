import { describe, expect, it } from 'vitest';
import { sumBy } from './sumBy';

describe('sumBy', () => {
  it('calculates the sum from the values selected by getValue', () => {
    expect(sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a)).toBe(6n);
  });

  it('passes the zero-based index to getValue', () => {
    expect(sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], (x, i) => x.a * BigInt(i))).toBe(8n);
  });

  it('returns 0n for an empty array', () => {
    expect(sumBy([], () => 1n)).toBe(0n);
  });
});
