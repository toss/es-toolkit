// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgAnsi256 } = await import('./bgAnsi256.ts');

describe('bgAnsi256', () => {
  it('wraps text with 8-bit background ANSI codes', () => {
    expect(bgAnsi256(208)('x')).toBe('\x1b[48;5;208mx\x1b[49m');
  });
});
