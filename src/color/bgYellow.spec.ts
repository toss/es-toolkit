import { describe, expect, it } from 'vitest';
import { bgYellow } from './bgYellow.ts';

describe('bgYellow', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgYellow('x')).toBe('\x1b[43mx\x1b[49m');
  });
});
