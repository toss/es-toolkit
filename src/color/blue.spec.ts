import { describe, expect, it } from 'vitest';
import { blue } from './blue.ts';

describe('blue', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(blue('x')).toBe('\x1b[34mx\x1b[39m');
  });
});
