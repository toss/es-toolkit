import { describe, it, expect } from 'vitest';
import { pad } from './pad';

describe('pad', () => {
  it('should pad a string on the left and right sides if it is shorter than the length', () => {
    expect(pad('abc', 8)).toBe('  abc   ');
  });

  it('should pad a string on the left and right sides with custom characters', () => {
    expect(pad('abc', 8, '_-')).toBe('_-abc_-_');
  });

  it('should not pad a string if it has the same length', () => {
    expect(pad('abc', 3)).toBe('abc');
  });

  it('should not pad a string if the length is less than the string length', () => {
    expect(pad('abc', 2)).toBe('abc');
    expect(pad('abc', 0)).toBe('abc');
  });

  it('should not pad a string if the length is not a number', () => {
    expect(pad('abc', NaN)).toBe('abc');
  });

  it('should not pad a string if the length is not an integer', () => {
    expect(pad('abc', 3.5)).toBe('abc');
  });

  it('should not pad a string if the length is negative', () => {
    expect(pad('abc', -3)).toBe('abc');
  });
});
