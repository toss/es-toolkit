import { describe, expect, it } from 'vitest';
import { yellow } from './yellow.ts';

describe('yellow', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(yellow('x')).toBe('\x1b[33mx\x1b[39m');
  });
});
