import { describe, expect, it } from 'vitest';
import { green } from './green.ts';

describe('green', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(green('x')).toBe('\x1b[32mx\x1b[39m');
  });
});
