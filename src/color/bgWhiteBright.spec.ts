import { describe, expect, it } from 'vitest';
import { bgWhiteBright } from './bgWhiteBright.ts';

describe('bgWhiteBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgWhiteBright('x')).toBe('\x1b[107mx\x1b[49m');
  });
});
