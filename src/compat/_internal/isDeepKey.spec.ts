import { describe, expect, it } from 'vitest';
import { isDeepKey } from './isDeepKey';

describe('isDeepKey function', () => {
  it('returns true for deep keys', () => {
    expect(isDeepKey('a.b')).toBe(true);
    expect(isDeepKey('a[b]')).toBe(true);
    expect(isDeepKey('a.b.c')).toBe(true);
    expect(isDeepKey('a[b][c]')).toBe(true);
  });

  it('returns false for non-deep keys', () => {
    expect(isDeepKey('a')).toBe(false);
    expect(isDeepKey(123)).toBe(false);
    expect(isDeepKey(Symbol('a'))).toBe(false);
  });

  it('returns false for invalid deep key patterns', () => {
    expect(isDeepKey('a.')).toBe(false);
    expect(isDeepKey('.a')).toBe(false);
    expect(isDeepKey('a[b')).toBe(false);
    expect(isDeepKey('a]b]')).toBe(false);
    expect(isDeepKey('a][b')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isDeepKey('')).toBe(false);
  });

  it('returns true for valid bracket patterns', () => {
    expect(isDeepKey('a[0]')).toBe(true);
    expect(isDeepKey('[a]')).toBe(true);
  });
});
