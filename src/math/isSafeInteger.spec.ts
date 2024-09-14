import { describe, expect, it } from 'vitest';
import { isSafeInteger } from './isSafeInteger.ts';

describe('isSafeInteger function', () => {
  it('checks if an int is an integer', () => {
    const result = isSafeInteger(1);
    expect(result).toBe(true);
  });

  it('checks if a float is not an integer', () => {
    const result = isSafeInteger(1.1);
    expect(result).toBe(false);
  });

  it('checks if a BigInt is not an integer', () => {
    const result = isSafeInteger(1n);
    expect(result).toBe(false);
  });

  it('checks if a string is not an integer', () => {
    const result = isSafeInteger('1');
    expect(result).toBe(false);
  });

  it('checks if an array is not an integer', () => {
    const result = isSafeInteger([]);
    expect(result).toBe(false);
  });

  it('checks if a NaN is not an integer', () => {
    const result = isSafeInteger(NaN);
    expect(result).toBe(false);
  });

  it('checks if a Infinity is not an integer', () => {
    const result = isSafeInteger(Infinity);
    expect(result).toBe(false);
  });

  it('checks if a value less than -(253 – 1) is not a safe integer', () => {
    const result = isSafeInteger(Number.MIN_SAFE_INTEGER - 2);
    expect(result).toBe(false);
  });

  it('checks if a value greater than (253 – 1) is not a safe integer', () => {
    const result = isSafeInteger(Number.MAX_SAFE_INTEGER + 2);
    expect(result).toBe(false);
  });
});
