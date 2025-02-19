import { describe, expect, it } from 'vitest';
import { join } from './join';

describe('join', () => {
  it('should join array elements with specified separator', () => {
    expect(join([1, 2, 3, 4], ',')).toBe('1,2,3,4');
    expect(join<number[]>(',')([1, 2, 3, 4])).toBe('1,2,3,4');
  });

  it('should handle empty arrays', () => {
    expect(join([], ',')).toBe('');
    expect(join<string[]>(',')([])).toBe('');
  });

  it('should work with different separators', () => {
    expect(join([1, 2, 3], '')).toBe('123');
    expect(join<number[]>('')([1, 2, 3])).toBe('123');
    expect(join([1, 2, 3], ' - ')).toBe('1 - 2 - 3');
    expect(join<number[]>(' - ')([1, 2, 3])).toBe('1 - 2 - 3');
  });

  it('should work with different types', () => {
    expect(join(['a', 'b', 'c'], '+')).toBe('a+b+c');
    expect(join<string[]>('+')(['a', 'b', 'c'])).toBe('a+b+c');
  });

  it('should not change value of original array', () => {
    const arr = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    join(arr, ',');
    join<number[]>(',')(arr2);

    expect(arr).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual([1, 2, 3, 4]);
  });
});
