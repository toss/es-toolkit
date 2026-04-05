// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createFormatter, parseHex, toString } from './formatter.ts';

describe('createFormatter', () => {
  const red = createFormatter('\x1b[31m', '\x1b[39m', false);
  const bgRed = createFormatter('\x1b[41m', '\x1b[49m', true);
  const bold = createFormatter('\x1b[1m', '\x1b[22m', false);
  const reset = createFormatter('\x1b[0m', '\x1b[0m', false);

  it('should wrap text with open and close codes', () => {
    expect(red('hello')).toBe('\x1b[31mhello\x1b[39m');
  });

  it('should return empty string for empty input', () => {
    expect(red('')).toBe('');
  });

  it('should coerce non-string input via String()', () => {
    expect(red(123)).toBe('\x1b[31m123\x1b[39m');
    expect(red(null)).toBe('\x1b[31mnull\x1b[39m');
    expect(red(undefined)).toBe('\x1b[31mundefined\x1b[39m');
    expect(red(true)).toBe('\x1b[31mtrue\x1b[39m');
  });

  it('should allow nesting different formatters', () => {
    expect(bold(red('hello'))).toBe('\x1b[1m\x1b[31mhello\x1b[39m\x1b[22m');
  });

  it('should re-open outer style when the same close code appears inside', () => {
    const inner = red('inner');
    const outer = red(`a ${inner} b`);
    expect(outer).toBe('\x1b[31ma \x1b[31minner\x1b[39m\x1b[31m b\x1b[39m');
  });

  it('should not break when open === close (e.g. reset)', () => {
    expect(reset('hello')).toBe('\x1b[0mhello\x1b[0m');
  });

  it('should re-open background color after each newline', () => {
    expect(bgRed('a\nb')).toBe('\x1b[41ma\x1b[49m\n\x1b[41mb\x1b[49m');
    expect(bgRed('a\nb\nc')).toBe('\x1b[41ma\x1b[49m\n\x1b[41mb\x1b[49m\n\x1b[41mc\x1b[49m');
  });

  it('should not split foreground colors at newlines', () => {
    expect(red('a\nb')).toBe('\x1b[31ma\nb\x1b[39m');
  });
});

describe('toString', () => {
  it('should convert any input to string without ANSI codes', () => {
    expect(toString('hello')).toBe('hello');
    expect(toString(123)).toBe('123');
    expect(toString(null)).toBe('null');
  });
});

describe('parseHex', () => {
  it('should parse #RRGGBB format', () => {
    expect(parseHex('#ff0000')).toEqual([255, 0, 0]);
    expect(parseHex('#00ff00')).toEqual([0, 255, 0]);
    expect(parseHex('#0000ff')).toEqual([0, 0, 255]);
  });

  it('should parse #RGB shorthand by expanding each digit', () => {
    expect(parseHex('#f00')).toEqual([255, 0, 0]);
    expect(parseHex('#0f0')).toEqual([0, 255, 0]);
  });

  it('should parse without # prefix', () => {
    expect(parseHex('ff0000')).toEqual([255, 0, 0]);
    expect(parseHex('f00')).toEqual([255, 0, 0]);
  });

  it('should return [0,0,0] for invalid length', () => {
    expect(parseHex('')).toEqual([0, 0, 0]);
    expect(parseHex('#ab')).toEqual([0, 0, 0]);
    expect(parseHex('#abcde')).toEqual([0, 0, 0]);
    expect(parseHex('a')).toEqual([0, 0, 0]);
  });

  it('should return [0,0,0] for non-hex characters', () => {
    expect(parseHex('#xyz')).toEqual([0, 0, 0]);
    expect(parseHex('#xxyyzz')).toEqual([0, 0, 0]);
  });

  it('should return [0,0,0] for partially valid hex strings', () => {
    expect(parseHex('#abcxyz')).toEqual([0, 0, 0]);
    expect(parseHex('#1g0000')).toEqual([0, 0, 0]);
    expect(parseHex('#12x')).toEqual([0, 0, 0]);
    expect(parseHex('fg0000')).toEqual([0, 0, 0]);
  });
});
