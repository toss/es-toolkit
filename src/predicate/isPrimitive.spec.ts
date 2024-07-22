import { describe, expect, it } from 'vitest';
import { isPrimitive } from './isPrimitive';

describe('isPrimitive', () => {
  it('returns `true` for primitives', () => {
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive('123')).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(Symbol('a'))).toBe(true);
    expect(isPrimitive(123n)).toBe(true);
  });

  it('returns `false` for values that are not primitives', () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
    expect(isPrimitive(new Map())).toBe(false);
    expect(isPrimitive(new Set())).toBe(false);
    expect(isPrimitive([1, 2, 3])).toBe(false);
  });
});
