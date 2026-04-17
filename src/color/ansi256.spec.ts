// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { ansi256 } = await import('./ansi256.ts');

describe('ansi256', () => {
  it('wraps text with 8-bit foreground ANSI codes', () => {
    expect(ansi256(208)('x')).toBe('\x1b[38;5;208mx\x1b[39m');
  });
});
