import { describe, expect, it } from 'vitest';
import { strikethrough } from './strikethrough.ts';

describe('strikethrough', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(strikethrough('x')).toBe('\x1b[9mx\x1b[29m');
  });
});
