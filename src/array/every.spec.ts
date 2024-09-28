import { describe, expect, it } from 'vitest';
import { every } from './every';

describe('every', () => {
  it('should return true for array with all elements passing predicate', () => {
    const arr = [1, 2, 3, 4];
    const result = every(arr, n => n > 0);
    expect(result).toBe(true);
  });

  it('should return false for array when an element does not pass predicate', () => {
    const arr = [1, 2, 3, -4];
    const result = every(arr, n => n > 0);
    expect(result).toBe(false);
  });

  it('should return true for empty array', () => {
    const result = every([], () => false);
    expect(result).toBe(true);
  });

  it('should return true for object with all values passing predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = every(obj, value => value > 0);
    expect(result).toBe(true);
  });

  it('should return false for object when a value does not pass predicate', () => {
    const obj = { a: 1, b: -2, c: 3 };
    const result = every(obj, value => value > 0);
    expect(result).toBe(false);
  });

  it('should return true for empty object', () => {
    const result = every({}, () => false);
    expect(result).toBe(true);
  });

  it('should return true for string where all characters pass predicate', () => {
    const str = 'hello';
    const result = every(str, char => char !== ' ');
    expect(result).toBe(true);
  });

  it('should return false for string where a character does not pass predicate', () => {
    const str = 'hello world';
    const result = every(str, char => char !== ' ');
    expect(result).toBe(false);
  });

  it('should return true for empty string', () => {
    const result = every('', () => false);
    expect(result).toBe(true);
  });

  it('should return true for null', () => {
    const result = every(null, () => false);
    expect(result).toBe(true);
  });

  it('should return true for undefined', () => {
    const result = every(undefined, () => false);
    expect(result).toBe(true);
  });

  it('should correctly handle indices for arrays', () => {
    const arr = [1, 2, 3];
    const result = every(arr, (n, index) => index < 3);
    expect(result).toBe(true);
  });

  it('should correctly handle keys for objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = every(obj, (value, key) => ['a', 'b', 'c'].includes(key));
    expect(result).toBe(true);
  });
});
