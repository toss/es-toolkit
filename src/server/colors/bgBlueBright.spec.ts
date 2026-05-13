import { describe, expect, it } from 'vitest';
import { bgBlueBright } from './bgBlueBright.ts';

describe('bgBlueBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(bgBlueBright('x')).toBe('\x1b[104mx\x1b[49m');
  });
});
