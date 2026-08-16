import { describe, expect, it } from 'vitest';
import { bgGreen } from './bgGreen.ts';

describe('bgGreen', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgGreen('x')).toBe('\x1b[42mx\x1b[49m');
  });
});
