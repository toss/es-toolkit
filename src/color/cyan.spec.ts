// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { cyan } = await import('./cyan.ts');

describe('cyan', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(cyan('x')).toBe('\x1b[36mx\x1b[39m');
  });
});
