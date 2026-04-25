import { describe, expect, it } from 'vitest';
import { white } from './white.ts';

describe('white', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(white('x')).toBe('\x1b[37mx\x1b[39m');
  });
});
