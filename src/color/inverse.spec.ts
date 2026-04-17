// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { inverse } = await import('./inverse.ts');

describe('inverse', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(inverse('x')).toBe('\x1b[7mx\x1b[27m');
  });
});
