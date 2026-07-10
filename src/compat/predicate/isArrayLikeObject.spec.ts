import { describe, expect, it } from 'vitest';
import { isArrayLikeObject } from './isArrayLikeObject';
import { toArgs } from '../_internal/toArgs';

describe('isArrayLikeObject', () => {
  it('should return `true` for non-primitive, array-like objects', () => {
    expect(isArrayLikeObject([1, 2, 3])).toBe(true);
    expect(isArrayLikeObject({ 0: 'a', length: 1 })).toBe(true);
    expect(isArrayLikeObject(new String('123'))).toBe(true);
    expect(isArrayLikeObject(toArgs([1, 2, 3]))).toBe(true);
  });

  it('should return `false` for primitive values', () => {
    expect(isArrayLikeObject('abc')).toBe(false);
    expect(isArrayLikeObject(1)).toBe(false);
    expect(isArrayLikeObject(true)).toBe(false);
    expect(isArrayLikeObject(undefined)).toBe(false);
    expect(isArrayLikeObject(null)).toBe(false);
    expect(isArrayLikeObject(Symbol())).toBe(false);
    expect(isArrayLikeObject(1n)).toBe(false);
  });

  it('should return `false` for non array-like objects', () => {
    expect(isArrayLikeObject({ name: 'mike' })).toBe(false);
    expect(isArrayLikeObject(() => {})).toBe(false);
    expect(isArrayLikeObject(/123/)).toBe(false);
    expect(isArrayLikeObject(new Date())).toBe(false);
    expect(isArrayLikeObject(new Error())).toBe(false);
  });
});
