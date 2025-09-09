import { describe, expect, it } from 'vitest';
import { reverseString } from './reverseString';

describe('reverseString', () => {
  it('should reverse a simple string', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  it('should reverse a string with spaces', () => {
    expect(reverseString('foo bar')).toBe('rab oof');
  });

  it('should reverse a string with Unicode characters', () => {
    expect(reverseString('foo 😄 bar')).toBe('rab 😄 oof');
    expect(reverseString('foo 𝌆 bar')).toBe('rab 𝌆 oof');
  });

  it('should reverse an empty string', () => {
    expect(reverseString('')).toBe('');
  });

  it('should reverse a numeric string', () => {
    expect(reverseString('12345')).toBe('54321');
  });
});
