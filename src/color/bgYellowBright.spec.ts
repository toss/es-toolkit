import { describe, expect, it } from 'vitest';
import { bgYellowBright } from './bgYellowBright.ts';

describe('bgYellowBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgYellowBright('x')).toBe('\x1b[103mx\x1b[49m');
  });
});
