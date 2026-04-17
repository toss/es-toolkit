// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { reset } = await import('./reset.ts');

describe('reset', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(reset('x')).toBe('\x1b[0mx\x1b[0m');
  });
});
