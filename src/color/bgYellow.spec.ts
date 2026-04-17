// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgYellow } = await import('./bgYellow.ts');

describe('bgYellow', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgYellow('x')).toBe('\x1b[43mx\x1b[49m');
  });
});
