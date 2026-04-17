// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { whiteBright } = await import('./whiteBright.ts');

describe('whiteBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(whiteBright('x')).toBe('\x1b[97mx\x1b[39m');
  });
});
