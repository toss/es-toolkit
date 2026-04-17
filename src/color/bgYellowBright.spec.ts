// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgYellowBright } = await import('./bgYellowBright.ts');

describe('bgYellowBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgYellowBright('x')).toBe('\x1b[103mx\x1b[49m');
  });
});
