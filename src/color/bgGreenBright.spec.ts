import { describe, expect, it } from 'vitest';
import { bgGreenBright } from './bgGreenBright.ts';

describe('bgGreenBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgGreenBright('x')).toBe('\x1b[102mx\x1b[49m');
  });
});
