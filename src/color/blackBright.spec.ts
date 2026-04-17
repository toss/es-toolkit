// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { blackBright } = await import('./blackBright.ts');

describe('blackBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(blackBright('x')).toBe('\x1b[90mx\x1b[39m');
  });
});
