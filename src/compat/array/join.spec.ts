import { describe, expect, it } from 'vitest';
import { join } from './join.js';
import { args } from '../_internal/args';

describe('join', () => {
  it('should join elements of an array into a string', () => {
    const arr = ['a', 'b', 'c'];
    const result = join(arr);
    expect(result).toBe('a,b,c');
  });

  it('should join elements of an array into a string with a custom separator', () => {
    const arr = ['a', 'b', 'c'];
    const result = join(arr, '~');
    expect(result).toBe('a~b~c');
  });

  it('should return an empty string for non-array-like values', () => {
    expect(join(null)).toBe('');
    expect(join(undefined)).toBe('');
    expect(join(1 as any)).toBe('');
  });

  it('should support array-like', () => {
    expect(join({ 0: 1, 1: 2, length: 2 })).toBe('1,2');
    expect(join('123')).toBe('1,2,3');
    expect(join(args)).toBe('1,2,3');
  });
});
