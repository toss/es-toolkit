import { describe, expect, it } from 'vitest';
import { red } from './red.ts';

describe('red', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(red('hi')).toBe('\x1b[31mhi\x1b[39m');
  });
});
