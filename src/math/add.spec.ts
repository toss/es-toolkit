import { describe, expect, it } from 'vitest';
import { add } from './add';

describe('add', () => {
  it('should return the sum of two valid numbers', () => {
    expect(add(2, 3)).toBe(5);
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

  it('should treat non-numeric values as NaN', () => {
    expect(add(5, 'a' as any)).toBe(NaN);
    expect(add('a' as any, 10)).toBe(NaN);
  });

  it('should return NaN when one value is a string', () => {
    expect(add(2, '3' as any)).toBe(NaN); // '3' is treated as 0
  });

  it('should return NaN if both values are non-numeric', () => {
    expect(add('a' as any, 'b' as any)).toBe(NaN);
  });
});
