import { describe, expect, expectTypeOf, it } from 'vitest';
import type { repeat as repeatLodash } from 'lodash';
import { repeat } from './repeat';

describe('padStart', () => {
  it('repeat abc 0', () => {
    expect(repeat('abc', 0)).toBe('');
  });

  it('repeat abc 3', () => {
    expect(repeat('abc', 3)).toBe('abcabcabc');
  });

  it('should be used as a iteratee', () => {
    const array = ['a', 'b', 'c'];
    const actual = array.map(repeat);
    expect(actual).toEqual(['a', 'b', 'c']);
  });

  it('should return empty string when n is less than 1', () => {
    expect(repeat('abc', 0)).toBe('');
    expect(repeat('abc', -1)).toBe('');
    expect(repeat('abc', -5)).toBe('');
    expect(repeat('abc', 0.5)).toBe('');
  });

  it('should return empty string when n is greater than MAX_SAFE_INTEGER', () => {
    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
    expect(repeat('abc', MAX_SAFE_INTEGER + 1)).toBe('');
    expect(repeat('abc', Infinity)).toBe('');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(repeat).toEqualTypeOf<typeof repeatLodash>();
  });
});
