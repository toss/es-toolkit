import { describe, expect, it } from 'vitest';
import { count } from './count.ts';

describe('count', () => {
  it('counts the elements of an iterator', () => {
    expect(count([1, 2, 3].values())).toBe(3);
  });

  it('returns 0 for an empty source', () => {
    expect(count([].values())).toBe(0);
  });

  it('counts the elements remaining after a lazy chain', () => {
    expect(count([1, 2, 3, 4, 5].values().filter(x => x % 2 === 1))).toBe(3);
  });
});
