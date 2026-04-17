// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { bgMagentaBright } = await import('./bgMagentaBright.ts');

describe('bgMagentaBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgMagentaBright('x')).toBe('\x1b[105mx\x1b[49m');
  });
});
