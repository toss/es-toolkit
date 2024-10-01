import { describe, expect, it } from 'vitest';
import { repeat } from './repeat';

describe('padStart', () => {
  it('repeat abc 0', () => {
    expect(repeat('abc', 0)).toBe('');
  });

  it('repeat abc 3', () => {
    expect(repeat('abc', 3)).toBe('abcabcabc');
  });
});
