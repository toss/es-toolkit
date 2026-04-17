// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgRed } = await import('./bgRed.ts');

describe('bgRed', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgRed('x')).toBe('\x1b[41mx\x1b[49m');
  });
});
