// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { magenta } = await import('./magenta.ts');

describe('magenta', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(magenta('x')).toBe('\x1b[35mx\x1b[39m');
  });
});
