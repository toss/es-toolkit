import { describe, expect, it } from 'vitest';
import { yellowBright } from './yellowBright.ts';

describe('yellowBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(yellowBright('x')).toBe('\x1b[93mx\x1b[39m');
  });
});
