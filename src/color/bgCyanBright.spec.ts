// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgCyanBright } = await import('./bgCyanBright.ts');

describe('bgCyanBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgCyanBright('x')).toBe('\x1b[106mx\x1b[49m');
  });
});
