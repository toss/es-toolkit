import { describe, expect, it } from 'vitest';
import { cyanBright } from './cyanBright.ts';

describe('cyanBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(cyanBright('x')).toBe('\x1b[96mx\x1b[39m');
  });
});
