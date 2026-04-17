// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bold } = await import('./bold.ts');

describe('bold', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bold('x')).toBe('\x1b[1mx\x1b[22m');
  });
});
