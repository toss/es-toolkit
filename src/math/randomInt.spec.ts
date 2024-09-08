import { describe, expect, it } from 'vitest';
import { randomInt } from './randomInt';

describe('randomInt', () => {
  it('generates a random integer between min (inclusive) and max (exclusive)', () => {
    const min = 0;
    const max = 5;
    for (let i = 0; i < 100; i++) {
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('generates a random integer between 0 (inclusive) and max (exclusive)', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(5);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('throws an error if min is greater than max', () => {
    const min = 5;
    const max = 0;
    expect(() => randomInt(min, max)).toThrow(
      'Invalid input: The maximum value must be greater than the minimum value.'
    );
  });

  it('handles edge cases where min and max are the same', () => {
    const min = 5;
    const max = 5;
    expect(() => randomInt(min, max)).toThrow(
      'Invalid input: The maximum value must be greater than the minimum value.'
    );
  });

  it('works with negative ranges', () => {
    const min = -10;
    const max = -1;
    for (let i = 0; i < 100; i++) {
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('works with a mix of negative and positive ranges', () => {
    const min = -5;
    const max = 5;
    for (let i = 0; i < 100; i++) {
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});
