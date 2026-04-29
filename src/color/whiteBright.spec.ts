import { describe, expect, it } from 'vitest';
import { whiteBright } from './whiteBright.ts';

describe('whiteBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(whiteBright('x')).toBe('\x1b[97mx\x1b[39m');
  });
});
