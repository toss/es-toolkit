// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { green } = await import('./green.ts');

describe('green', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(green('x')).toBe('\x1b[32mx\x1b[39m');
  });
});
