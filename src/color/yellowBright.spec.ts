// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { yellowBright } = await import('./yellowBright.ts');

describe('yellowBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(yellowBright('x')).toBe('\x1b[93mx\x1b[39m');
  });
});
