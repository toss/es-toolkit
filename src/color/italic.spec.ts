// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { italic } = await import('./italic.ts');

describe('italic', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(italic('x')).toBe('\x1b[3mx\x1b[23m');
  });
});
