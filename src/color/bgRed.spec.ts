import { describe, expect, it } from 'vitest';
import { bgRed } from './bgRed.ts';

describe('bgRed', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgRed('x')).toBe('\x1b[41mx\x1b[49m');
  });

  it('re-opens background after newlines so color stays contiguous across lines', () => {
    expect(bgRed('a\nb')).toBe('\x1b[41ma\x1b[49m\n\x1b[41mb\x1b[49m');
  });
});
