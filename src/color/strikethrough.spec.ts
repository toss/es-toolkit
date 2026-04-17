// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { strikethrough } = await import('./strikethrough.ts');

describe('strikethrough', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(strikethrough('x')).toBe('\x1b[9mx\x1b[29m');
  });
});
