import { describe, expect, it } from 'vitest';
import { isJSONObject } from './isJSONObject.ts';

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
});
