import { describe, expect, it } from 'vitest';
import { rgb } from './rgb.ts';

describe('rgb', () => {
  it('should wrap text with 24-bit foreground ANSI codes', () => {
    expect(rgb(255, 99, 71)('x')).toBe('\x1b[38;2;255;99;71mx\x1b[39m');
  });
});
