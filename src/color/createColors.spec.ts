// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createColors } from './createColors.ts';

describe('createColors', () => {
  it('should auto-detect color support when no argument is passed', () => {
    const c = createColors();
    expect(typeof c.red('hello')).toBe('string');
  });

  describe('enabled', () => {
    const c = createColors(true);

    it('should apply ANSI codes for basic colors', () => {
      expect(c.red('hello')).toBe('\x1b[31mhello\x1b[39m');
      expect(c.bold('hello')).toBe('\x1b[1mhello\x1b[22m');
      expect(c.bgRed('hello')).toBe('\x1b[41mhello\x1b[49m');
      expect(c.dim('hello')).toBe('\x1b[2mhello\x1b[22m');
      expect(c.green('hello')).toBe('\x1b[32mhello\x1b[39m');
      expect(c.gray('hello')).toBe('\x1b[90mhello\x1b[39m');
    });

    it('should produce correct 256-color codes', () => {
      expect(c.ansi256(196)('hello')).toBe('\x1b[38;5;196mhello\x1b[39m');
      expect(c.bgAnsi256(196)('hello')).toBe('\x1b[48;5;196mhello\x1b[49m');
    });

    it('should produce correct RGB codes', () => {
      expect(c.rgb(255, 0, 0)('hello')).toBe('\x1b[38;2;255;0;0mhello\x1b[39m');
      expect(c.bgRgb(0, 255, 0)('hello')).toBe('\x1b[48;2;0;255;0mhello\x1b[49m');
    });

    it('should produce correct hex codes', () => {
      expect(c.hex('#ff0000')('hello')).toBe('\x1b[38;2;255;0;0mhello\x1b[39m');
      expect(c.hex('#f00')('hello')).toBe('\x1b[38;2;255;0;0mhello\x1b[39m');
      expect(c.hex('ff0000')('hello')).toBe('\x1b[38;2;255;0;0mhello\x1b[39m');
      expect(c.bgHex('#00ff00')('hello')).toBe('\x1b[48;2;0;255;0mhello\x1b[49m');
    });

    it('should handle background multiline for extended colors', () => {
      expect(c.bgAnsi256(196)('a\nb')).toBe('\x1b[48;5;196ma\x1b[49m\n\x1b[48;5;196mb\x1b[49m');
    });
  });

  describe('disabled', () => {
    const c = createColors(false);

    it('should return plain string for all color functions', () => {
      expect(c.red('hello')).toBe('hello');
      expect(c.bold('hello')).toBe('hello');
      expect(c.bgRed('hello')).toBe('hello');
    });

    it('should return plain string for all extended color functions', () => {
      expect(c.ansi256(196)('hello')).toBe('hello');
      expect(c.bgAnsi256(196)('hello')).toBe('hello');
      expect(c.rgb(255, 0, 0)('hello')).toBe('hello');
      expect(c.bgRgb(0, 255, 0)('hello')).toBe('hello');
      expect(c.hex('#ff0000')('hello')).toBe('hello');
      expect(c.bgHex('#00ff00')('hello')).toBe('hello');
    });
  });
});
