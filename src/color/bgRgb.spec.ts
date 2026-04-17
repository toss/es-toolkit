// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgRgb } = await import('./bgRgb.ts');

describe('bgRgb', () => {
  it('wraps text with 24-bit background ANSI codes', () => {
    expect(bgRgb(255, 99, 71)('x')).toBe('\x1b[48;2;255;99;71mx\x1b[49m');
  });
});
