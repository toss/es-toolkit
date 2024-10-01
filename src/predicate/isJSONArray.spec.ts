import { describe, expect, it } from 'vitest';
import { isJSONArray } from './isJSONArray.ts';

describe('isJSONArray', () => {
  it('should return true for valid JSON arrays', () => {
    expect(isJSONArray([1, 2, 3])).toBe(true);
    expect(isJSONArray(['string', null, true])).toBe(true);
    expect(isJSONArray([{ key: 'value' }, [1, 2], null])).toBe(true);
    expect(isJSONArray([])).toBe(true);
  });

  it('should return false for invalid JSON arrays', () => {
    expect(isJSONArray('not an array')).toBe(false);
    expect(isJSONArray(123)).toBe(false);
    expect(isJSONArray(null)).toBe(false);
    expect(isJSONArray(undefined)).toBe(false);
    expect(isJSONArray({})).toBe(false);
    expect(isJSONArray([1, 2, () => {}])).toBe(false);
    expect(isJSONArray([1, 2, new Date()])).toBe(false);
  });
});
