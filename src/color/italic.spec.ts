import { describe, expect, it } from 'vitest';
import { italic } from './italic.ts';

describe('italic', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(italic('x')).toBe('\x1b[3mx\x1b[23m');
  });
});
