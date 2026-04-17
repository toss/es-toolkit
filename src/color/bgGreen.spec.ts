// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgGreen } = await import('./bgGreen.ts');

describe('bgGreen', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgGreen('x')).toBe('\x1b[42mx\x1b[49m');
  });
});
