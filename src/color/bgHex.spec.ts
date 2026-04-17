// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgHex } = await import('./bgHex.ts');

describe('bgHex', () => {
  it('wraps text with RGB background parsed from #RRGGBB', () => {
    expect(bgHex('#ff6347')('x')).toBe('\x1b[48;2;255;99;71mx\x1b[49m');
  });

  it('wraps text with RGB background parsed from #RGB shorthand', () => {
    expect(bgHex('#f00')('x')).toBe('\x1b[48;2;255;0;0mx\x1b[49m');
  });
});
