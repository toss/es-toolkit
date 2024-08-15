import { describe, it, expect } from 'vitest';
import { padEnd } from './padEnd';

describe('padEnd', () => {
  it('should return the original string if no length and char is provided', () => {
    expect(padEnd('abc')).toBe('abc');
  });

  it('should pad a string on the right side if it is shorter than the length', () => {
    expect(padEnd('abc', 6)).toBe('abc   ');
  });

  it('should pad a string on the right side with custom characters', () => {
    expect(padEnd('abc', 6, '_-')).toBe('abc_-_');
  });

  it('should not pad a string if it has the same length', () => {
    expect(padEnd('abc', 3)).toBe('abc');
  });

  it('should not pad a string if the length is less than the string length', () => {
    expect(padEnd('abc', 2)).toBe('abc');
  });

  it('should not pad a string if the length is not a number', () => {
    expect(padEnd('abc', NaN)).toBe('abc');
  });

  it('should not pad a string if the length is not an integer', () => {
    expect(padEnd('abc', 3.5)).toBe('abc');
  });

  it('should not pad a string if the length is negative', () => {
    expect(padEnd('abc', -3)).toBe('abc');
  });
});
