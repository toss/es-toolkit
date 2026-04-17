// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { cyanBright } = await import('./cyanBright.ts');

describe('cyanBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(cyanBright('x')).toBe('\x1b[96mx\x1b[39m');
  });
});
