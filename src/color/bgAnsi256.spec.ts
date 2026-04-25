import { describe, expect, it } from 'vitest';
import { bgAnsi256 } from './bgAnsi256.ts';

describe('bgAnsi256', () => {
  it('wraps text with 8-bit background ANSI codes', () => {
    expect(bgAnsi256(208)('x')).toBe('\x1b[48;5;208mx\x1b[49m');
  });
});
