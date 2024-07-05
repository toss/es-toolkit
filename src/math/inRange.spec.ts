import { describe, expect, it } from 'vitest';
import { inRange } from './inRange';

describe('inRange', () => {
  it('returns true for values within the range when two parameters are provided', () => {
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(3.2, 5.3)).toBe(true);
  });

  it('returns false for values outside the range when two parameters are provided', () => {
    expect(inRange(3, 2)).toBe(false);
    expect(inRange(5.3, 3.2)).toBe(false);
  });

  it('returns true for values within the range when three parameters are provided', () => {
    expect(inRange(1, 0, 5)).toBe(true);
    expect(inRange(-3, -5, -1)).toBe(true);
  });

  it('returns false for values outside the range when three parameters are provided', () => {
    expect(inRange(1, 2, 5)).toBe(false);
    expect(inRange(-5, -3, -1)).toBe(false);
  });

  it('throws an error if the minimum is greater or equal than the maximum', () => {
    expect(() => inRange(1, 5, 2)).toThrowErrorMatchingInlineSnapshot(
      `[Error: The maximum value must be greater than the minimum value.]`
    );
  });
});
