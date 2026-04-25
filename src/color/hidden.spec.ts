import { describe, expect, it } from 'vitest';
import { hidden } from './hidden.ts';

describe('hidden', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(hidden('x')).toBe('\x1b[8mx\x1b[28m');
  });
});
