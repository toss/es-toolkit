import { describe, expect, it } from 'vitest';
import { subtract } from './subtract';

describe('subtract', () => {
  it('should subtract two numbers', () => {
    expect(subtract(6, 4)).toBe(2);
    expect(subtract(6, -4)).toBe(10);
    expect(subtract(-6, 4)).toBe(-10);
    expect(subtract(-6, -4)).toBe(-2);
  });

  it('should not coerce arguments to numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(subtract('6', '4')).toBe(2);
  });

  it('should return the difference of two positive numbers', () => {
    expect(subtract(1, 5)).toBe(-4);
    expect(subtract(5, 1)).toBe(4);
  });

  it('should return the difference when both numbers are negative', () => {
    expect(subtract(-1, -5)).toBe(4);
    expect(subtract(-5, -1)).toBe(-4);
  });

  it('should return the difference of a negative and a positive number', () => {
    expect(subtract(-1, 5)).toBe(-6);
    expect(subtract(5, -1)).toBe(6);
  });

  it('should return NaN if the first value is NaN', () => {
    expect(subtract(NaN, 10)).toBe(NaN);
  });

  it('should return NaN if the second value is NaN', () => {
    expect(subtract(10, NaN)).toBe(NaN);
  });

  it('should return NaN if both values are NaN', () => {
    expect(subtract(NaN, NaN)).toBe(NaN);
  });
});
