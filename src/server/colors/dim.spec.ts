import { describe, expect, it } from 'vitest';
import { dim } from './dim.ts';

describe('dim', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(dim('x')).toBe('\x1b[2mx\x1b[22m');
  });
});
