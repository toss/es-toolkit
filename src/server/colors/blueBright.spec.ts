import { describe, expect, it } from 'vitest';
import { blueBright } from './blueBright.ts';

describe('blueBright', () => {
  it('should wrap text with the expected ANSI codes', () => {
    expect(blueBright('x')).toBe('\x1b[94mx\x1b[39m');
  });
});
