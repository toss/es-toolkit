import { describe, expect, it } from 'vitest';
import { magentaBright } from './magentaBright.ts';

describe('magentaBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(magentaBright('x')).toBe('\x1b[95mx\x1b[39m');
  });
});
