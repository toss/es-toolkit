// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { gray } = await import('./gray.ts');
const { blackBright } = await import('./blackBright.ts');

describe('gray', () => {
  it('is an alias of blackBright', () => {
    expect(gray).toBe(blackBright);
  });

  it('wraps text with bright-black ANSI codes', () => {
    expect(gray('x')).toBe('\x1b[90mx\x1b[39m');
  });
});
