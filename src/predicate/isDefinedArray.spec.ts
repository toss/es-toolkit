import { describe, expect, it } from 'vitest';
import { isDefinedArray } from './isDefinedArray';

describe('isDefinedArray', () => {
  it('should return `true` for arrays with only defined values', () => {
    expect(isDefinedArray([1, 2, 3])).toBe(true);
    expect(isDefinedArray([undefined, 1, 2, 3])).toBe(false);
    expect(isDefinedArray([null, 1, 2, 3])).toBe(false);
    expect(isDefinedArray([undefined, null, 1, 2, 3])).toBe(false);
    expect(isDefinedArray([1, 2, 3, undefined])).toBe(false);
    expect(isDefinedArray([1, 2, 3, null])).toBe(false);
    expect(isDefinedArray([1, 2, 3, undefined, null])).toBe(false);
  });

  it('should return `true` for empty arrays', () => {
    expect(isDefinedArray([])).toBe(true);
  });
});
