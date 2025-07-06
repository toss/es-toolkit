import { describe, expect, it } from 'vitest';
import { rgbToHex } from './rgbToHex';

describe('rgbToHex', () => {
  it('should convert basic RGB colors to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
  });

  it('should convert black and white', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });

  it('should handle values that need padding', () => {
    expect(rgbToHex(15, 0, 0)).toBe('#0f0000');
    expect(rgbToHex(0, 15, 0)).toBe('#000f00');
    expect(rgbToHex(0, 0, 15)).toBe('#00000f');
    expect(rgbToHex(1, 2, 3)).toBe('#010203');
  });

  it('should handle common colors', () => {
    expect(rgbToHex(128, 128, 128)).toBe('#808080');
    expect(rgbToHex(255, 192, 203)).toBe('#ffc0cb');
    expect(rgbToHex(255, 165, 0)).toBe('#ffa500');
    expect(rgbToHex(128, 0, 128)).toBe('#800080');
  });

  it('should throw error for decimal values', () => {
    expect(() => rgbToHex(255.4, 0, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(0, 127.5, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(0, 0, 0.8)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(127.6, 127.4, 127.5)).toThrow('RGB values must be integers between 0 and 255');
  });

  it('should throw error for values below 0', () => {
    expect(() => rgbToHex(-1, 0, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(0, -1, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(0, 0, -1)).toThrow('RGB values must be integers between 0 and 255');
  });

  it('should throw error for values above 255', () => {
    expect(() => rgbToHex(256, 0, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(0, 256, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(0, 0, 256)).toThrow('RGB values must be integers between 0 and 255');
  });

  it('should throw error for non-integer values after rounding check', () => {
    expect(() => rgbToHex(NaN, 0, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(Infinity, 0, 0)).toThrow('RGB values must be integers between 0 and 255');
    expect(() => rgbToHex(-Infinity, 0, 0)).toThrow('RGB values must be integers between 0 and 255');
  });

  it('should handle edge cases', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(127, 127, 127)).toBe('#7f7f7f');
  });
});
