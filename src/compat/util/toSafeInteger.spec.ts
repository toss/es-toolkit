import { describe, expect, it } from 'vitest';
import { toSafeInteger } from './toSafeInteger';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';

describe('toSafeInteger methods', () => {
  it('should convert values to safe integers', () => {
    expect(toSafeInteger(-5.6)).toBe(-5);
    expect(toSafeInteger('5.6')).toBe(5);
    expect(toSafeInteger()).toBe(0);
    expect(toSafeInteger(NaN)).toBe(0);

    expect(toSafeInteger(Infinity)).toBe(MAX_SAFE_INTEGER);
    expect(toSafeInteger(-Infinity)).toBe(-MAX_SAFE_INTEGER);
  });

  it('should support `value` of `-0`', () => {
    expect(1 / toSafeInteger(-0)).toBe(-Infinity);
  });
});
