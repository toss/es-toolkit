// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { yellow } = await import('./yellow.ts');

describe('yellow', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(yellow('x')).toBe('\x1b[33mx\x1b[39m');
  });
});
