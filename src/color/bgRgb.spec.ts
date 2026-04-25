import { describe, expect, it } from 'vitest';
import { bgRgb } from './bgRgb.ts';

describe('bgRgb', () => {
  it('wraps text with 24-bit background ANSI codes', () => {
    expect(bgRgb(255, 99, 71)('x')).toBe('\x1b[48;2;255;99;71mx\x1b[49m');
  });
});
