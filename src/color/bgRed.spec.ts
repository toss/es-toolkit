import { describe, expect, it } from 'vitest';
import { bgRed } from './bgRed.ts';

describe('bgRed', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgRed('x')).toBe('\x1b[41mx\x1b[49m');
  });
});
