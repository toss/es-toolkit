import { describe, expect, it } from 'vitest';
import { ansi256 } from './ansi256.ts';

describe('ansi256', () => {
  it('should wrap text with 8-bit foreground ANSI codes', () => {
    expect(ansi256(208)('x')).toBe('\x1b[38;5;208mx\x1b[39m');
  });
});
