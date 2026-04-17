// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgBlack } = await import('./bgBlack.ts');

describe('bgBlack', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgBlack('x')).toBe('\x1b[40mx\x1b[49m');
  });
});
