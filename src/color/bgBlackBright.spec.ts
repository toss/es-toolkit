// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgBlackBright } = await import('./bgBlackBright.ts');

describe('bgBlackBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgBlackBright('x')).toBe('\x1b[100mx\x1b[49m');
  });
});
