import { describe, expect, it } from 'vitest';
import { blackBright } from './blackBright.ts';

describe('blackBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(blackBright('x')).toBe('\x1b[90mx\x1b[39m');
  });
});
