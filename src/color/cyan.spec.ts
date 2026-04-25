import { describe, expect, it } from 'vitest';
import { cyan } from './cyan.ts';

describe('cyan', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(cyan('x')).toBe('\x1b[36mx\x1b[39m');
  });
});
