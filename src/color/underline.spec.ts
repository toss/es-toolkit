import { describe, expect, it } from 'vitest';
import { underline } from './underline.ts';

describe('underline', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(underline('x')).toBe('\x1b[4mx\x1b[24m');
  });
});
