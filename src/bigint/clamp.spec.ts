import { describe, expect, it } from 'vitest';
import { clamp } from './clamp';

describe('clamp', () => {
  it('clamps to the maximum when called with two arguments', () => {
    expect(clamp(10n, 5n)).toBe(5n);
    expect(clamp(3n, 5n)).toBe(3n);
  });

  it('clamps to the minimum and maximum when called with three arguments', () => {
    expect(clamp(10n, 0n, 5n)).toBe(5n);
    expect(clamp(-10n, 0n, 5n)).toBe(0n);
    expect(clamp(3n, 0n, 5n)).toBe(3n);
  });

  it('returns the bounds themselves when the value is on the edge', () => {
    expect(clamp(0n, 0n, 5n)).toBe(0n);
    expect(clamp(5n, 0n, 5n)).toBe(5n);
  });

  it('handles negative ranges', () => {
    expect(clamp(-10n, -5n, -1n)).toBe(-5n);
    expect(clamp(0n, -5n, -1n)).toBe(-1n);
  });

  it('stays exact beyond Number.MAX_SAFE_INTEGER', () => {
    expect(clamp(9007199254740995n, 0n, 9007199254740993n)).toBe(9007199254740993n);
  });
});
