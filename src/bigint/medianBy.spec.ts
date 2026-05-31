import { describe, expect, it } from 'vitest';
import { medianBy } from './medianBy';

describe('medianBy', () => {
  it('returns the median for an odd number of elements', () => {
    expect(medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }, { a: 5n }], x => x.a)).toBe(3n);
  });

  it('returns the average of the two middle elements, truncated toward zero, for an even number of elements', () => {
    expect(medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }], x => x.a)).toBe(2n);
  });

  it('returns undefined for an empty array', () => {
    const items: Array<{ a: bigint }> = [];
    expect(medianBy(items, x => x.a)).toBeUndefined();
  });
});
