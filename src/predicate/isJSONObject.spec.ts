import { isJSONObject } from './isJSONObject.ts';
import { describe, it, expect } from 'vitest';

describe ('isJSONObject', () => {
it('isJSONObject should return true for valid JSON objects', () => {  
  expect(isJSONObject({ name: 'Alice', age: 30 })).toBe(true);  
  expect(isJSONObject({})).toBe(true);  
  expect(isJSONObject({ nested: { object: true }, array: [1, 2, 3], string: 'test' })).toBe(true);  
  expect(isJSONObject({ nested: { valid: true, nestedAgain: { deep: 'value' } } })).toBe(true);  
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
  expect(isJSONObject({ nested: { a: new Map() } })).toBe(false);  
  expect(isJSONObject({ nested: { a: {}, b: function () {} } })).toBe(false);  
});
})
