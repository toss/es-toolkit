import { describe, expect, it } from 'vitest';
import { isValidRgbValue } from './isValidRgbValue';

describe('isValidRgbValue', () => {
  it('should return true for valid RGB values', () => {
    expect(isValidRgbValue(0)).toBe(true);
    expect(isValidRgbValue(255)).toBe(true);
    expect(isValidRgbValue(128)).toBe(true);
    expect(isValidRgbValue(1)).toBe(true);
    expect(isValidRgbValue(254)).toBe(true);
  });

  it('should return false for values below 0', () => {
    expect(isValidRgbValue(-1)).toBe(false);
    expect(isValidRgbValue(-10)).toBe(false);
    expect(isValidRgbValue(-255)).toBe(false);
  });

  it('should return false for values above 255', () => {
    expect(isValidRgbValue(256)).toBe(false);
    expect(isValidRgbValue(300)).toBe(false);
    expect(isValidRgbValue(1000)).toBe(false);
  });

  it('should return false for decimal values', () => {
    expect(isValidRgbValue(3.14)).toBe(false);
    expect(isValidRgbValue(0.5)).toBe(false);
    expect(isValidRgbValue(255.1)).toBe(false);
    expect(isValidRgbValue(127.5)).toBe(false);
  });

  it('should return false for special number values', () => {
    expect(isValidRgbValue(NaN)).toBe(false);
    expect(isValidRgbValue(Infinity)).toBe(false);
    expect(isValidRgbValue(-Infinity)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidRgbValue(0.0)).toBe(true);
    expect(isValidRgbValue(255.0)).toBe(true);
  });
});
