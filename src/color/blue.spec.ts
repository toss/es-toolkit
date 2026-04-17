// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { blue } = await import('./blue.ts');

describe('blue', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(blue('x')).toBe('\x1b[34mx\x1b[39m');
  });
});
