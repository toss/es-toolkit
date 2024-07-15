import { describe, it, expect } from 'vitest';
import { isEqual } from './isEqual';

describe('isEqual', () => {
  it('should return true for equal primitive values', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
  });

  it('should return true for NaN comparisons', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
  });

  it('should return false for +0 and -0 comparisons', () => {
    expect(isEqual(+0, -0)).toBe(false);
  });

  it('should return true for equal Date objects', () => {
    const date1 = new Date('2020-01-01');
    const date2 = new Date('2020-01-01');
    expect(isEqual(date1, date2)).toBe(true);
  });

  it('should return false for different Date objects', () => {
    const date1 = new Date('2020-01-01');
    const date2 = new Date('2021-01-01');
    expect(isEqual(date1, date2)).toBe(false);
  });

  it('should return true for equal RegExp objects', () => {
    const regex1 = /hello/g;
    const regex2 = /hello/g;
    expect(isEqual(regex1, regex2)).toBe(true);
  });

  it('should return false for different RegExp objects', () => {
    const regex1 = /hello/g;
    const regex2 = /hello/i;
    expect(isEqual(regex1, regex2)).toBe(false);
  });

  it('should return true for deeply equal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for objects with different values', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return false for objects with different keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 2 };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return true for deeply equal arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(isEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for arrays with different values', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(isEqual(arr1, arr2)).toBe(false);
  });

  it('should return false for arrays with different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(isEqual(arr1, arr2)).toBe(false);
  });
});
