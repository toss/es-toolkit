import { describe, expect, it } from 'vitest';
import { meanBy } from './meanBy';

describe('meanBy', () => {
  it('calculates the average from the values selected by getValue', () => {
    expect(meanBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a)).toBe(2n);
  });

  it('truncates toward zero', () => {
    expect(meanBy([{ a: 1n }, { a: 2n }], x => x.a)).toBe(1n);
  });

  it('returns undefined for an empty array', () => {
    const items: Array<{ a: bigint }> = [];
    expect(meanBy(items, x => x.a)).toBeUndefined();
  });
});
