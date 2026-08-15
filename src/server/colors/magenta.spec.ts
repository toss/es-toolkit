import { describe, expect, it } from 'vitest';
import { magenta } from './magenta.ts';

describe('magenta', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(magenta('x')).toBe('\x1b[35mx\x1b[39m');
  });
});
