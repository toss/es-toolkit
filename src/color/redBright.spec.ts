// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { redBright } = await import('./redBright.ts');

describe('redBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(redBright('x')).toBe('\x1b[91mx\x1b[39m');
  });
});
