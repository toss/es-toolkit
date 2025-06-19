import { describe, expect, it, expectTypeOf } from 'vitest';
import type { isFinite as isFiniteLodash } from 'lodash';
import { isFinite } from './isFinite';

describe('isFinite', () => {
  it("should return 'true' for finite values", () => {
    expect(isFinite(1)).toBe(true);
    expect(isFinite(1.123)).toBe(true);
    expect(isFinite(-1)).toBe(true);
  });

  it("should return 'false' for not-finite values", () => {
    expect(isFinite(Infinity)).toBe(false);
    expect(isFinite(-Infinity)).toBe(false);
    expect(isFinite(NaN)).toBe(false);
    expect(isFinite(Object(1))).toBe(false);
  });

  it("should return 'false' for non-numeric values", () => {
    expect(isFinite(undefined)).toBe(false);
    expect(isFinite([])).toBe(false);
    expect(isFinite(true)).toBe(false);
    expect(isFinite('')).toBe(false);
    expect(isFinite(' ')).toBe(false);
    expect(isFinite('2px')).toBe(false);
  });

  it("should return 'false' for numeric string values", () => {
    expect(isFinite('2')).toBe(false);
    expect(isFinite('0')).toBe(false);
    expect(isFinite('Infinity')).toBe(false);
    expect(isFinite('-1')).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isFinite).toEqualTypeOf<typeof isFiniteLodash>();
  });
});
