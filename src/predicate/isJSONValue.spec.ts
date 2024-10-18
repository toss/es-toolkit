import { describe, expect, it } from 'vitest';
import { isJSONArray, isJSONObject, isJSONValue } from './isJSONValue.ts';

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

describe('isJSONObject', () => {
  it('isJSONObject should return true for valid JSON objects', () => {
    expect(isJSONObject({ a: 1, b: 'es-toolkit' })).toBe(true);
    expect(isJSONObject({})).toBe(true);
    expect(isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } })).toBe(true);
  });

  it('isJSONObject should return false for not valid value', () => {
    expect(isJSONObject(null)).toBe(false);
    expect(isJSONObject(undefined)).toBe(false);
    expect(isJSONObject('string')).toBe(false);
    expect(isJSONObject(123)).toBe(false);
    expect(isJSONObject(true)).toBe(false);
    expect(isJSONObject([1, 2, 3])).toBe(false);
    expect(isJSONObject({ date: new Date() })).toBe(false);
    expect(isJSONObject({ func: () => {} })).toBe(false);
    expect(isJSONObject({ regexp: /test/ })).toBe(false);
    expect(isJSONObject({ undefinedProperty: undefined })).toBe(false);
    expect(isJSONObject({ symbolProperty: Symbol('test') })).toBe(false);
    expect(isJSONObject({ nested: { a: function* () {} } })).toBe(false);
  });

  it('isJSONObject should return false when key is not a string', () => {
    expect(isJSONObject({ [Symbol('a')]: 'a' })).toBe(false);
  });
});
