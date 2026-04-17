// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { hidden } = await import('./hidden.ts');

describe('hidden', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(hidden('x')).toBe('\x1b[8mx\x1b[28m');
  });
});
