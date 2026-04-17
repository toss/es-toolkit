// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { rgb } = await import('./rgb.ts');

describe('rgb', () => {
  it('wraps text with 24-bit foreground ANSI codes', () => {
    expect(rgb(255, 99, 71)('x')).toBe('\x1b[38;2;255;99;71mx\x1b[39m');
  });
});
