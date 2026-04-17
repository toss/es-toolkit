// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { hex } = await import('./hex.ts');

describe('hex', () => {
  it('wraps text with RGB foreground parsed from #RRGGBB', () => {
    expect(hex('#ff6347')('x')).toBe('\x1b[38;2;255;99;71mx\x1b[39m');
  });

  it('wraps text with RGB foreground parsed from #RGB shorthand', () => {
    expect(hex('#f00')('x')).toBe('\x1b[38;2;255;0;0mx\x1b[39m');
  });
});
