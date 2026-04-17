// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { dim } = await import('./dim.ts');

describe('dim', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(dim('x')).toBe('\x1b[2mx\x1b[22m');
  });
});
