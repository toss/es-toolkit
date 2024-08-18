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
});
