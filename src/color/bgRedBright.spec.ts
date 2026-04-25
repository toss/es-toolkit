import { describe, expect, it } from 'vitest';
import { bgRedBright } from './bgRedBright.ts';

describe('bgRedBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgRedBright('x')).toBe('\x1b[101mx\x1b[49m');
  });
});
