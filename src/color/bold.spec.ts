import { describe, expect, it } from 'vitest';
import { bold } from './bold.ts';

describe('bold', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bold('x')).toBe('\x1b[1mx\x1b[22m');
  });
});
