// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { white } = await import('./white.ts');

describe('white', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(white('x')).toBe('\x1b[37mx\x1b[39m');
  });
});
