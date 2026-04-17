// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

describe('makeColor', () => {
  it('returns a formatter when color is supported', async () => {
    vi.resetModules();
    vi.doMock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));
    const { makeColor } = await import('./makeColor.ts');
    expect(makeColor('[O]', '[C]')('x')).toBe('[O]x[C]');
  });

  it('returns identity passthrough when color is not supported', async () => {
    vi.resetModules();
    vi.doMock('./colorLevel.ts', () => ({ isColorSupported: false, colorLevel: 0 }));
    const { makeColor } = await import('./makeColor.ts');
    expect(makeColor('[O]', '[C]')('x')).toBe('x');
  });
});
