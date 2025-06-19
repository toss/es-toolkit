import { describe, expect, it } from 'vitest';
import { isKey } from './isKey';

describe('isKey', () => {
  it('should return `true` for property names', () => {
    expect(isKey('a')).toBe(true);
    expect(isKey(false)).toBe(true);
    expect(isKey(1)).toBe(true);
    expect(isKey(null)).toBe(true);
    expect(isKey(undefined)).toBe(true);
    expect(isKey(-1.1)).toBe(true);
    expect(isKey(Symbol.iterator)).toBe(true);
  });

  it('should return `false` for property paths', () => {
    expect(isKey('a.b')).toBe(false);
    expect(isKey('a[0]')).toBe(false);
    expect(isKey('a["b"]')).toBe(false);
    expect(isKey("a['b']")).toBe(false);
    expect(isKey('a[0].b')).toBe(false);
    expect(isKey('a[0]["b"]')).toBe(false);
    expect(isKey("a[0]['b']")).toBe(false);
  });

  it('should return `true` for property paths that are in the object', () => {
    expect(isKey('a', { a: 1 })).toBe(true);
    expect(isKey('a.b', { 'a.b': 2 })).toBe(true);
    expect(isKey('a[0]', { 'a[0]': 3 })).toBe(true);
    expect(isKey('a["b"]', { 'a["b"]': 4 })).toBe(true);
    expect(isKey('a[0].b', { 'a[0].b': 5 })).toBe(true);
    expect(isKey("a[0]['b']", { "a[0]['b']": 6 })).toBe(true);
  });

  it('should return `false` for arrays', () => {
    expect(isKey([])).toBe(false);
    expect(isKey([1])).toBe(false);
    expect(isKey([1, 2])).toBe(false);
    expect(isKey([1, 2, 3])).toBe(false);
  });

  it('should return true for empty string', () => {
    expect(isKey('')).toBe(true);
  });

  it('should return true for non-word characters', () => {
    expect(isKey('^')).toBe(true);
    expect(isKey('!')).toBe(true);
    expect(isKey('@')).toBe(true);
  });
});
