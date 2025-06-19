import { describe, expect, it, expectTypeOf } from 'vitest';
import type { isDeepKey as isDeepKeyLodash } from 'lodash';
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
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isDeepKey).toEqualTypeOf<typeof isDeepKeyLodash>();
  });
});
