// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { magentaBright } = await import('./magentaBright.ts');

describe('magentaBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(magentaBright('x')).toBe('\x1b[95mx\x1b[39m');
  });
});
