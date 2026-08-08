import { describe, expect, it } from 'vitest';
import { max } from './max';

describe('max', () => {
  it('returns the largest bigint', () => {
    expect(max([1n, 5n, 3n])).toBe(5n);
  });

  it('returns the only element of a single-element array', () => {
    expect(max([42n])).toBe(42n);
  });

  it('handles negative bigints', () => {
    expect(max([-5n, -1n, -3n])).toBe(-1n);
  });

  it('distinguishes values beyond Number.MAX_SAFE_INTEGER', () => {
    expect(max([9007199254740992n, 9007199254740993n])).toBe(9007199254740993n);
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => max([])).toThrowError(new RangeError('Cannot find the maximum of an empty array.'));
  });
});
