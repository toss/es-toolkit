// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgBlue } = await import('./bgBlue.ts');

describe('bgBlue', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgBlue('x')).toBe('\x1b[44mx\x1b[49m');
  });
});
