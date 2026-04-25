import { describe, expect, it } from 'vitest';
import { bgBlue } from './bgBlue.ts';

describe('bgBlue', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgBlue('x')).toBe('\x1b[44mx\x1b[49m');
  });
});
