// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgRedBright } = await import('./bgRedBright.ts');

describe('bgRedBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgRedBright('x')).toBe('\x1b[101mx\x1b[49m');
  });
});
