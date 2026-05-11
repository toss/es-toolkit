import { describe, expect, it } from 'vitest';
import { sortKeys } from './sortKeys';

describe('sortKeys', () => {
  it('should sort object keys alphabetically by default', () => {
    const result = sortKeys({ c: 3, a: 1, b: 2 });
    expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should sort keys with a custom compare function', () => {
    const result = sortKeys({ a: 1, b: 2, c: 3 }, (a, b) => b.localeCompare(a));
    expect(Object.keys(result)).toEqual(['c', 'b', 'a']);
  });

  it('should return an empty object for empty input', () => {
    const result = sortKeys({});
    expect(result).toEqual({});
    expect(Object.keys(result)).toEqual([]);
  });

  it('should preserve values after sorting', () => {
    const obj = { z: [1, 2], a: { nested: true }, m: 'hello' };
    const result = sortKeys(obj);

    expect(Object.keys(result)).toEqual(['a', 'm', 'z']);
    expect(result.z).toEqual([1, 2]);
    expect(result.a).toEqual({ nested: true });
    expect(result.m).toBe('hello');
  });

  it('should handle numeric string keys', () => {
    const result = sortKeys({ 3: 'c', 1: 'a', 2: 'b' });
    expect(Object.keys(result)).toEqual(['1', '2', '3']);
  });

  it('should not mutate the original object', () => {
    const obj = { b: 2, a: 1 };
    const result = sortKeys(obj);

    expect(result).not.toBe(obj);
    expect(Object.keys(obj)).toEqual(['b', 'a']);
  });

  it('should handle single-key objects', () => {
    const result = sortKeys({ only: 1 });
    expect(Object.keys(result)).toEqual(['only']);
    expect(result).toEqual({ only: 1 });
  });
});
