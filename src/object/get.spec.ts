import { describe, expect, it } from 'vitest';
import { get } from './get';

describe('get', () => {
  it('should return defaultVersion', () => {
    const obj = { a: { b: 3 } };
    expect(get(obj, 'a.c', null)).toBe(null);
    expect(get(obj, 'a.d', 4)).toBe(4);
    expect(get(obj, 'a.e', undefined)).toBe(undefined);
  });

  it('should return value', () => {
    const obj = { a: { b: 3 } };
    expect(get(obj, 'a.b')).toBe(3);
  });

  it('should return value with array', () => {
    const obj = { a: [ { b: 3 } ] };
    expect(get(obj, 'a[0].b')).toBe(3);
  });

  it('should return undefined if array index number is not provided', () => {
    const obj = { a: [ { b: 1 } ] }
    expect(get(obj, 'a[].b')).toBe(undefined);
  });
});
