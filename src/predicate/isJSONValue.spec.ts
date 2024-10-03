import { describe, expect, it } from 'vitest';
import { isJSONValue } from './isJSONValue.ts';

describe('isJSONValue', () => {
  it('should return true for null', () => {
    expect(isJSONValue(null)).toBe(true);
  });

  it('should return true for a valid JSON object', () => {
    expect(isJSONValue({ key: 'value' })).toBe(true);
    expect(
      isJSONValue({
        nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null },
      })
    ).toBe(true);
  });

  it('should return true for a valid JSON array', () => {
    expect(isJSONValue([1, 2, 3])).toBe(true);
    expect(isJSONValue(['string', 42, null, true])).toBe(true);
  });

  it('should return true for valid JSON primitive types', () => {
    expect(isJSONValue('Hello')).toBe(true);
    expect(isJSONValue(42)).toBe(true);
    expect(isJSONValue(true)).toBe(true);
  });

  it('should return false for invalid JSON values', () => {
    expect(isJSONValue(undefined)).toBe(false);
    expect(isJSONValue(() => {})).toBe(false);
    expect(isJSONValue(new Date())).toBe(false);
    expect(isJSONValue(/regex/)).toBe(false);
    expect(isJSONValue(Symbol('symbol'))).toBe(false);
  });
});
