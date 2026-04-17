// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgWhiteBright } = await import('./bgWhiteBright.ts');

describe('bgWhiteBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgWhiteBright('x')).toBe('\x1b[107mx\x1b[49m');
  });
});
