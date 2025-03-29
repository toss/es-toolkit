import { describe, expect, it } from 'vitest';
import { min } from './min';

describe('min', () => {
  it('should return the largest value from a collection', () => {
    expect(min([1, 2, 3])).toBe(1);
  });

  it('should return `undefined` for empty collections', () => {
    expect(min([])).toBe(undefined);
    expect(min()).toBe(undefined);
  });

  it('should work with non-numeric collection values', () => {
    expect(min(['a', 'b'])).toBe('a');
  });

  it('should work with Date objects', () => {
    const curr = new Date();
    const past = new Date(0);

    expect(min([curr, past])).toBe(past);
  });

  it('should work with extremely large arrays', () => {
    const array = Array.from({ length: 5e5 }, (_, i) => i);
    expect(min(array)).toBe(0);
  });

  it('should work when chaining on an array with only one value', () => {
    const array = [40];
    expect(min(array)).toBe(40);
  });
});
