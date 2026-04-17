// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { black } = await import('./black.ts');

describe('black', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(black('x')).toBe('\x1b[30mx\x1b[39m');
  });
});
