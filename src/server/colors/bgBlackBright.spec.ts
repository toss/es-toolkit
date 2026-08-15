import { describe, expect, it } from 'vitest';
import { bgBlackBright } from './bgBlackBright.ts';

describe('bgBlackBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgBlackBright('x')).toBe('\x1b[100mx\x1b[49m');
  });
});
