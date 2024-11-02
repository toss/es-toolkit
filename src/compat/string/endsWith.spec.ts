import { describe, expect, it } from 'vitest';
import { endsWith } from './endsWith';

describe('endsWith', () => {
  it('should return true if the string ends with the target string', () => {
    expect(endsWith('fooBar', 'Bar')).toEqual(true);
  });

  it('should return false if the string does not end with the target string', () => {
    expect(endsWith('fooBar', 'abc')).toEqual(false);
  });

  it('should return false if the string does not end with the target string, but does contain it', () => {
    expect(endsWith('fooBar', 'foo')).toEqual(false);
  });

  it('should return true if the target string is an empty string', () => {
    expect(endsWith('fooBar', '')).toEqual(true);
  });

  it('should return true if the string and target string are empty strings', () => {
    expect(endsWith('', '')).toEqual(true);
  });

  it('should return false if the string past the provided position does not end with the target string', () => {
    expect(endsWith('fooBar', 'foo', 5)).toEqual(false);
  });

  it('should return true if the string before the provided position ends with the target string', () => {
    expect(endsWith('fooBar123', 'foo', 3)).toEqual(true);
  });

  const string = 'abc';

  it('should return `true` if a string ends with `target`', () => {
    expect(endsWith(string, 'c')).toBe(true);
  });

  it('should return `false` if a string does not end with `target`', () => {
    expect(endsWith(string, 'b')).toBe(false);
  });

  it('should work with a `position`', () => {
    expect(endsWith(string, 'b', 2)).toBe(true);
  });

  it('should work with `position` >= `length`', () => {
    expect(endsWith(string, 'c', 3)).toBe(true);
    expect(endsWith(string, 'c', 5)).toBe(true);
    expect(endsWith(string, 'c', Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(endsWith(string, 'c', Infinity)).toBe(true);
  });

  it('should treat a negative `position` as `0`', () => {
    expect(endsWith(string, string[0], -1)).toBe(false);
    expect(endsWith(string, string[1], -1)).toBe(false);
    expect(endsWith(string, string[2], -1)).toBe(false);
    expect(endsWith(string, '', -1)).toBe(true);

    expect(endsWith(string, string[0], -3)).toBe(false);
    expect(endsWith(string, string[1], -3)).toBe(false);
    expect(endsWith(string, string[2], -3)).toBe(false);
    expect(endsWith(string, '', -3)).toBe(true);

    expect(endsWith(string, string[0], -Infinity)).toBe(false);
    expect(endsWith(string, string[1], -Infinity)).toBe(false);
    expect(endsWith(string, string[2], -Infinity)).toBe(false);
    expect(endsWith(string, '', -Infinity)).toBe(true);
  });

  it('should coerce `position` to an integer', () => {
    expect(endsWith(string, 'ab', 2.2)).toBe(true);
  });
});
