// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgMagenta } = await import('./bgMagenta.ts');

describe('bgMagenta', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgMagenta('x')).toBe('\x1b[45mx\x1b[49m');
  });
});
