import { describe, expect, it } from 'vitest';
import { gray } from './gray.ts';

const { blackBright } = await import('./blackBright.ts');

describe('gray', () => {
  it('is an alias of blackBright', () => {
    expect(gray).toBe(blackBright);
  });

  it('wraps text with bright-black ANSI codes', () => {
    expect(gray('x')).toBe('\x1b[90mx\x1b[39m');
  });
});
