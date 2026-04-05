// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { stripAnsi } from './stripAnsi.ts';

describe('stripAnsi', () => {
  it('should remove basic foreground color codes', () => {
    expect(stripAnsi('\x1b[31mhello\x1b[39m')).toBe('hello');
  });

  it('should remove style codes like bold', () => {
    expect(stripAnsi('\x1b[1mbold\x1b[22m')).toBe('bold');
  });

  it('should remove background color codes', () => {
    expect(stripAnsi('\x1b[41mhello\x1b[49m')).toBe('hello');
  });

  it('should remove 256-color codes', () => {
    expect(stripAnsi('\x1b[38;5;196mhello\x1b[39m')).toBe('hello');
  });

  it('should remove RGB color codes', () => {
    expect(stripAnsi('\x1b[38;2;255;0;0mhello\x1b[39m')).toBe('hello');
  });

  it('should remove multiple nested codes at once', () => {
    expect(stripAnsi('\x1b[1m\x1b[31mbold red\x1b[39m\x1b[22m')).toBe('bold red');
  });

  it('should remove multiple color segments in a single string', () => {
    const input = '\x1b[31mred\x1b[39m normal \x1b[32mgreen\x1b[39m';
    expect(stripAnsi(input)).toBe('red normal green');
  });

  it('should return the same string when there are no ANSI codes', () => {
    expect(stripAnsi('hello world')).toBe('hello world');
  });

  it('should return an empty string for empty input', () => {
    expect(stripAnsi('')).toBe('');
  });
});
