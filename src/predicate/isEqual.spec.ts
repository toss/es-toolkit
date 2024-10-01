import { describe, expect, it } from 'vitest';
import { isEqual } from './isEqual';

describe('isEqual', () => {
  it('should return true for equal primitive values', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(100n, 100n)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(101n, 100n)).toBe(false);
  });

  it('should return true for NaN comparisons', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
  });

  it('should return true for +0 and -0 comparisons', () => {
    expect(isEqual(+0, -0)).toBe(true);
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

    const obj3 = null;
    const obj4 = null;

    expect(isEqual(obj3, obj4)).toBe(true);
  });

  it('should return false for objects with different values', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(isEqual(obj1, obj2)).toBe(false);

    const obj3 = null;
    const obj4 = { a: 1, b: { c: 3 } };

    expect(isEqual(obj3, obj4)).toBe(false);
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

  it('should return true for equal array buffers', () => {
    const buffer1 = new Uint8Array([1, 2, 3]).buffer;
    const buffer2 = new Uint8Array([1, 2, 3]).buffer;

    expect(isEqual(buffer1, buffer2)).toBe(true);
  });

  it('should return false for different array buffers', () => {
    const buffer1 = new Uint8Array([1, 2, 3]).buffer;
    const buffer2 = new Uint8Array([1, 2]).buffer;

    expect(isEqual(buffer1, buffer2)).toBe(false);

    const buffer3 = new Uint8Array([1, 2, 3]).buffer;
    const buffer4 = new Uint8Array([1, 2, 4]).buffer;

    expect(isEqual(buffer3, buffer4)).toBe(false);
  });
});
