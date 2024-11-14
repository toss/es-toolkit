import { describe, expect, it } from 'vitest';
import { add } from './add';

describe('add', () => {
  it('should return the sum of two valid numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should return the sum of two valid numbers', () => {
    expect(add(-1, -5)).toBe(-6);
  });

  it('should return the sum of two valid numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });

  it('should return NaN if the first value is NaN', () => {
    expect(add(NaN, 10)).toBe(NaN);
  });

  it('should return NaN if the second value is NaN', () => {
    expect(add(5, NaN)).toBe(NaN);
  });

  it('should return NaN if both values are NaN', () => {
    expect(add(NaN, NaN)).toBe(NaN);
  });
});
