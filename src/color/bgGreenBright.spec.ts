// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgGreenBright } = await import('./bgGreenBright.ts');

describe('bgGreenBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgGreenBright('x')).toBe('\x1b[102mx\x1b[49m');
  });
});
