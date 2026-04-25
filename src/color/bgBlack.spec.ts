import { describe, expect, it } from 'vitest';
import { bgBlack } from './bgBlack.ts';

describe('bgBlack', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgBlack('x')).toBe('\x1b[40mx\x1b[49m');
  });
});
