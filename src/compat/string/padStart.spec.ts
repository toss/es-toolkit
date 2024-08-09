import { describe, it, expect } from 'vitest';
import { padStart } from './padStart';

describe('padStart', () => {
  it('should return the original string if no length and char is provided', () => {
    expect(padStart('abc')).toBe('abc');
  });

  it('should pad a string on the left side if it is shorter than the length', () => {
    expect(padStart('abc', 6)).toBe('   abc');
  });

  it('should pad a string on the left side with custom characters', () => {
    expect(padStart('abc', 6, '_-')).toBe('_-_abc');
  });

  it('should not pad a string if it has the same length', () => {
    expect(padStart('abc', 3)).toBe('abc');
  });

  it('should not pad a string if the length is less than the string length', () => {
    expect(padStart('abc', 2)).toBe('abc');
  });

  it('should not pad a string if the length is not a number', () => {
    expect(padStart('abc', NaN)).toBe('abc');
  });

  it('should not pad a string if the length is not an integer', () => {
    expect(padStart('abc', 3.5)).toBe('abc');
  });

  it('should not pad a string if the length is negative', () => {
    expect(padStart('abc', -3)).toBe('abc');
  });
});
