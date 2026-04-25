import { describe, expect, it } from 'vitest';
import { inverse } from './inverse.ts';

describe('inverse', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(inverse('x')).toBe('\x1b[7mx\x1b[27m');
  });
});
