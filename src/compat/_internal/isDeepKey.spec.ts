import { describe, expect, it } from 'vitest';
import { isDeepKey } from 'es-toolkit/compat';

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
  });
});
