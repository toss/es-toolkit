// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('./colorLevel.ts', () => ({ isColorSupported: true, colorLevel: 3 }));

const { red } = await import('./red.ts');

describe('red', () => {
  it('wraps text with red ANSI codes', () => {
    expect(red('hi')).toBe('\x1b[31mhi\x1b[39m');
  });
});
