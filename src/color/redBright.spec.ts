import { describe, expect, it } from 'vitest';
import { redBright } from './redBright.ts';

describe('redBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(redBright('x')).toBe('\x1b[91mx\x1b[39m');
  });
});
