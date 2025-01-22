import { describe, expect, it } from 'vitest';
import { multiply } from './multiply';

describe('multiply', () => {
  it('should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(2, -3)).toBe(-6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });

  it('should return the product of two positive numbers', () => {
    expect(multiply(2, 4)).toBe(8);
    expect(multiply(3, 4)).toBe(12);
  });

  it('should return the product when both numbers are negative', () => {
    expect(multiply(-2, -4)).toBe(8);
    expect(multiply(-3, -4)).toBe(12);
  });

  it('should return the product of a negative and a positive number', () => {
    expect(multiply(-1, 5)).toBe(-5);
    expect(multiply(5, -1)).toBe(-5);
  });

  it('should return NaN if the first value is NaN', () => {
    expect(multiply(NaN, 3)).toBe(NaN);
  });

  it('should return NaN if the second value is NaN', () => {
    expect(multiply(3, NaN)).toBe(NaN);
  });

  it('should return NaN if both values are NaN', () => {
    expect(multiply(NaN, NaN)).toBe(NaN);
  });

  it('should multiply two numbers', () => {
    expect(multiply(6, 4)).toBe(24);
    expect(multiply(-6, 4)).toBe(-24);
    expect(multiply(-6, -4)).toBe(24);
  });

  it('should coerce arguments to numbers', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(multiply('6', '4')).toBe(24);
    // eslint-disable-next-line
    // @ts-ignore
    expect(multiply('x', 'y')).toEqual(NaN);
  });
});
