// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { blueBright } = await import('./blueBright.ts');

describe('blueBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(blueBright('x')).toBe('\x1b[94mx\x1b[39m');
  });
});
