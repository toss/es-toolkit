import { describe, expect, it } from 'vitest';
import { isValidHex } from './isValidHex';

describe('isValidHex', () => {
  it('should return true for valid 6-digit hex strings', () => {
    expect(isValidHex('ff0000')).toBe(true);
    expect(isValidHex('00ff00')).toBe(true);
    expect(isValidHex('0000ff')).toBe(true);
    expect(isValidHex('ffffff')).toBe(true);
    expect(isValidHex('000000')).toBe(true);
    expect(isValidHex('123456')).toBe(true);
    expect(isValidHex('abcdef')).toBe(true);
  });

  it('should return true for valid 3-digit hex strings', () => {
    expect(isValidHex('f00')).toBe(true);
    expect(isValidHex('0f0')).toBe(true);
    expect(isValidHex('00f')).toBe(true);
    expect(isValidHex('fff')).toBe(true);
    expect(isValidHex('000')).toBe(true);
    expect(isValidHex('123')).toBe(true);
    expect(isValidHex('abc')).toBe(true);
  });

  it('should return true for mixed case hex strings', () => {
    expect(isValidHex('FF0000')).toBe(true);
    expect(isValidHex('fF0000')).toBe(true);
    expect(isValidHex('aB12Cd')).toBe(true);
    expect(isValidHex('AbC')).toBe(true);
    expect(isValidHex('aBc123')).toBe(true);
  });

  it('should return false for invalid lengths', () => {
    expect(isValidHex('')).toBe(false);
    expect(isValidHex('f')).toBe(false);
    expect(isValidHex('ff')).toBe(false);
    expect(isValidHex('ff00')).toBe(false);
    expect(isValidHex('ff000')).toBe(false);
    expect(isValidHex('ff00000')).toBe(false);
    expect(isValidHex('ff000000')).toBe(false);
  });

  it('should return false for non-hex characters', () => {
    expect(isValidHex('gg0000')).toBe(false);
    expect(isValidHex('ff00xx')).toBe(false);
    expect(isValidHex('zz0000')).toBe(false);
    expect(isValidHex('ff00!!')).toBe(false);
    expect(isValidHex('ggg')).toBe(false);
    expect(isValidHex('xyz')).toBe(false);
  });

  it('should return false for strings with special characters', () => {
    expect(isValidHex('ff00-0')).toBe(false);
    expect(isValidHex('ff00 0')).toBe(false);
    expect(isValidHex('ff00.0')).toBe(false);
    expect(isValidHex('f@0')).toBe(false);
    expect(isValidHex('f#0')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidHex('0')).toBe(false);
    expect(isValidHex('00')).toBe(false);
    expect(isValidHex('000')).toBe(true);
    expect(isValidHex('000000')).toBe(true);
    expect(isValidHex('fFeEdD')).toBe(true);
  });
});
