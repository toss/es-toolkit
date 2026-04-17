// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { underline } = await import('./underline.ts');

describe('underline', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(underline('x')).toBe('\x1b[4mx\x1b[24m');
  });
});
