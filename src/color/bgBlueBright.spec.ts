// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgBlueBright } = await import('./bgBlueBright.ts');

describe('bgBlueBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgBlueBright('x')).toBe('\x1b[104mx\x1b[49m');
  });
});
