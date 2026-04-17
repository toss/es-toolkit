// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgCyan } = await import('./bgCyan.ts');

describe('bgCyan', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgCyan('x')).toBe('\x1b[46mx\x1b[49m');
  });
});
