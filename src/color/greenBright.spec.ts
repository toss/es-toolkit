import { describe, expect, it } from 'vitest';
import { greenBright } from './greenBright.ts';

describe('greenBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(greenBright('x')).toBe('\x1b[92mx\x1b[39m');
  });
});
