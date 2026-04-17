// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgWhite } = await import('./bgWhite.ts');

describe('bgWhite', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgWhite('x')).toBe('\x1b[47mx\x1b[49m');
  });
});
