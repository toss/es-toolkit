import { describe, expect, it } from 'vitest';
import { reset } from './reset.ts';

describe('reset', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(reset('x')).toBe('\x1b[0mx\x1b[0m');
  });
});
