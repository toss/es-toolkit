import { describe, expect, it } from 'vitest';
import { hexToRgb } from './hexToRgb';

describe('hexToRgb', () => {
  it('should convert 6-digit hex with # prefix to RGB', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should convert 6-digit hex without # prefix to RGB', () => {
    expect(hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('0000ff')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should convert 3-digit hex with # prefix to RGB', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#00f')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should convert 3-digit hex without # prefix to RGB', () => {
    expect(hexToRgb('f00')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('0f0')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('00f')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should handle mixed case hex values', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#fF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('aB12Cd')).toEqual({ r: 171, g: 18, b: 205 });
    expect(hexToRgb('#AbC')).toEqual({ r: 170, g: 187, b: 204 });
  });

  it('should handle common colors', () => {
    expect(hexToRgb('#808080')).toEqual({ r: 128, g: 128, b: 128 });
    expect(hexToRgb('#ffc0cb')).toEqual({ r: 255, g: 192, b: 203 });
    expect(hexToRgb('#ffa500')).toEqual({ r: 255, g: 165, b: 0 });
    expect(hexToRgb('#800080')).toEqual({ r: 128, g: 0, b: 128 });
  });

  it('should throw error for invalid hex strings', () => {
    expect(() => hexToRgb('')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('#')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('##ff0000')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('#ff00')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('#ff00000')).toThrow('Invalid hex color string');
  });

  it('should throw error for non-hex characters', () => {
    expect(() => hexToRgb('#gg0000')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('#ff00xx')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('zz0000')).toThrow('Invalid hex color string');
    expect(() => hexToRgb('#ff00!!')).toThrow('Invalid hex color string');
  });

  it('should handle edge cases', () => {
    expect(hexToRgb('#7f7f7f')).toEqual({ r: 127, g: 127, b: 127 });
    expect(hexToRgb('010203')).toEqual({ r: 1, g: 2, b: 3 });
    expect(hexToRgb('#0f0f0f')).toEqual({ r: 15, g: 15, b: 15 });
  });
});
