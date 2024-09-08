import { describe, expect, it } from 'vitest';
import { castArray } from './castArray';

describe('castArray', () => {
  it('should cast a number to an array', () => {
    expect(castArray(1)).toEqual([1]);
  });

  it('should return the original array if input is already an array', () => {
    const input = [1];
    expect(castArray(input)).toBe(input);
  });

  it('should cast an object to an array', () => {
    expect(castArray({ a: 1 })).toEqual([{ a: 1 }]);
  });

  it('should cast null to an array', () => {
    expect(castArray(null)).toEqual([null]);
  });

  it('should cast undefined to an array with undefined', () => {
    expect(castArray(undefined)).toEqual([undefined]);
  });

  it('should return an empty array when called without arguments', () => {
    expect(castArray()).toEqual([]);
  });
});
