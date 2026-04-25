import { describe, expect, it } from 'vitest';
import { bgWhite } from './bgWhite.ts';

describe('bgWhite', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgWhite('x')).toBe('\x1b[47mx\x1b[49m');
  });
});
