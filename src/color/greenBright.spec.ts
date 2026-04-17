// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { greenBright } = await import('./greenBright.ts');

describe('greenBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(greenBright('x')).toBe('\x1b[92mx\x1b[39m');
  });
});
