import { describe, expect, it } from 'vitest';
import { min } from './min';

describe('min', () => {
  it('returns the smallest bigint', () => {
    expect(min([1n, 5n, 3n])).toBe(1n);
  });

  it('returns the only element of a single-element array', () => {
    expect(min([42n])).toBe(42n);
  });

  it('handles negative bigints', () => {
    expect(min([-5n, -1n, -3n])).toBe(-5n);
  });

  it('distinguishes values beyond Number.MAX_SAFE_INTEGER', () => {
    expect(min([9007199254740993n, 9007199254740992n])).toBe(9007199254740992n);
  });

  it('throws a RangeError for an empty array', () => {
    expect(() => min([])).toThrowError(new RangeError('Cannot find the minimum of an empty array.'));
  });
});
