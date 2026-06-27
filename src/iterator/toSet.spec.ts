import { describe, expect, it } from 'vitest';
import { toSet } from './toSet.ts';

describe('toSet', () => {
  it('collects elements into a Set', () => {
    expect(toSet([1, 2, 3].values())).toEqual(new Set([1, 2, 3]));
  });

  it('removes duplicates', () => {
    expect(toSet([1, 2, 2, 3, 3].values())).toEqual(new Set([1, 2, 3]));
  });

  it('returns an empty Set for an empty source', () => {
    expect(toSet([].values())).toEqual(new Set());
  });

  it('drains a lazy iterator chain', () => {
    const result = toSet([1, 2, 3, 4].values().filter(x => x % 2 === 0));
    expect(result).toEqual(new Set([2, 4]));
  });
});
