import { describe, expect, it } from 'vitest';
import { bgGreen } from './bgGreen.ts';

describe('bgGreen', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgGreen('x')).toBe('\x1b[42mx\x1b[49m');
  });
});
