import { describe, expect, it } from 'vitest';
import { isInteger } from './isInteger.ts';

describe('isInteger function', () => {
  it('checks if an int is an integer', () => {
    const result = isInteger(1);
    expect(result).toBe(true);
  });

  it('checks if a float is not an integer', () => {
    const result = isInteger(1.1);
    expect(result).toBe(false);
  });

  it('checks if a BigInt is not an integer', () => {
    const result = isInteger(1n);
    expect(result).toBe(false);
  });

  it('checks if a string is not an integer', () => {
    const result = isInteger('1');
    expect(result).toBe(false);
  });

  it('checks if an array is not an integer', () => {
    const result = isInteger([]);
    expect(result).toBe(false);
  });

  it('checks if a NaN is not an integer', () => {
    const result = isInteger(NaN);
    expect(result).toBe(false);
  });

  it('checks if a Infinity is not an integer', () => {
    const result = isInteger(Infinity);
    expect(result).toBe(false);
  });
});
