import { describe, expect, it } from 'vitest';
import { black } from './black.ts';

describe('black', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(black('x')).toBe('\x1b[30mx\x1b[39m');
  });
});
