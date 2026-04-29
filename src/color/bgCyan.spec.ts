import { describe, expect, it } from 'vitest';
import { bgCyan } from './bgCyan.ts';

describe('bgCyan', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgCyan('x')).toBe('\x1b[46mx\x1b[49m');
  });
});
