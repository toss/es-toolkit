import { describe, expect, expectTypeOf, it } from 'vitest';
import type { clamp as clampLodash } from 'lodash';
import { clamp } from './clamp';

describe('clamp', () => {
  it('should work with a `max`', () => {
    expect(clamp(5, 3)).toBe(3);
    expect(clamp(1, 3)).toBe(1);
  });

  it('should clamp negative numbers', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(-10.2, -5.5, 5.5)).toBe(-5.5);
    expect(clamp(-Infinity, -5, 5)).toBe(-5);
  });

  it('should clamp positive numbers', () => {
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(10.6, -5.6, 5.4)).toBe(5.4);
    expect(clamp(Infinity, -5, 5)).toBe(5);
  });

  it('should not alter negative numbers in range', () => {
    expect(clamp(-4, -5, 5)).toBe(-4);
    expect(clamp(-5, -5, 5)).toBe(-5);
    expect(clamp(-5.5, -5.6, 5.6)).toBe(-5.5);
  });

  it('should not alter positive numbers in range', () => {
    expect(clamp(4, -5, 5)).toBe(4);
    expect(clamp(5, -5, 5)).toBe(5);
    expect(clamp(4.5, -5.1, 5.2)).toBe(4.5);
  });

  it('should not alter `0` in range', () => {
    expect(1 / clamp(0, -5, 5)).toBe(Infinity);
  });

  it('should clamp to `0`', () => {
    expect(1 / clamp(-10, 0, 5)).toBe(Infinity);
  });

  it('should not alter `-0` in range', () => {
    expect(1 / clamp(-0, -5, 5)).toBe(-Infinity);
  });

  it('should clamp to `-0`', () => {
    expect(1 / clamp(-10, -0, 5)).toBe(-Infinity);
  });

  it('should return `NaN` when `number` is `NaN`', () => {
    expect(clamp(NaN, -5, 5)).toEqual(NaN);
  });

  it('should coerce `min` and `max` of `NaN` to `0`', () => {
    expect(clamp(1, -5, NaN)).toEqual(0);
    expect(clamp(-1, NaN, 5)).toEqual(0);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(clamp).toEqualTypeOf<typeof clampLodash>();
  });

  it('should work with undefined as lower bound', () => {
    expect(clamp(5, undefined as any, 10)).toBe(5);
    expect(clamp(-100, undefined as any, 10)).toBe(-100);
    expect(clamp(100, undefined as any, 10)).toBe(10);
  });

  it('should work with undefined as upper bound', () => {
    expect(clamp(5, 0, undefined as any)).toBe(0);
    expect(clamp(-100, 0, undefined as any)).toBe(-100);
    expect(clamp(100, 0, undefined as any)).toBe(0);
  });

  it('should work with only number provided', () => {
    // @ts-expect-error - testing runtime behavior when only one argument is provided
    expect(clamp(5)).toBe(5);
    // @ts-expect-error - testing runtime behavior when only one argument is provided
    expect(clamp(-100)).toBe(-100);
    // @ts-expect-error - testing runtime behavior when only one argument is provided
    expect(clamp(100)).toBe(100);
  });

  it('should handle non-numeric bounds', () => {
    expect(clamp(5, 'a' as any, 10)).toBe(5);
    expect(clamp(5, 0, 'b' as any)).toBe(0);
  });

  it('should handle upper bound less than lower bound', () => {
    expect(clamp(5, 10, 0)).toBe(10);
    expect(clamp(15, 10, 0)).toBe(10);
    expect(clamp(-5, 10, 0)).toBe(10);
  });

  it('should handle Infinity and -Infinity correctly', () => {
    expect(clamp(Infinity, 0, 10)).toBe(10);
    expect(clamp(-Infinity, 0, 10)).toBe(0);
    expect(clamp(5, -Infinity, Infinity)).toBe(5);
    expect(clamp(5, Infinity, -Infinity)).toBe(Infinity);
  });

  it('should handle special NaN combinations', () => {
    expect(clamp(5, NaN, NaN)).toBe(0);
    expect(clamp(NaN, NaN, 10)).toBe(NaN);
    expect(clamp(5, NaN, undefined as any)).toBe(0);
    expect(clamp(5, undefined as any, NaN)).toBe(0);
  });

  it('should handle boolean bounds', () => {
    expect(clamp(5, false as any, true as any)).toBe(1);
    expect(clamp(5, true as any, false as any)).toBe(1);
  });
});
