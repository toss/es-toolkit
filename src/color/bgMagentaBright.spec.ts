import { describe, expect, it } from 'vitest';
import { bgMagentaBright } from './bgMagentaBright.ts';

describe('bgMagentaBright', () => {
  it('wraps text with the expected ANSI codes', () => {
    expect(bgMagentaBright('x')).toBe('\x1b[105mx\x1b[49m');
  });
});
