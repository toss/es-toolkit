import { describe, expect, it } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('sums an array of numbers', () => {
    const result = reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur, 0);
    expect(result).toBe(15);
  });

  it('multiplies an array of numbers', () => {
    const result = reduce([1, 2, 3, 4], (acc, cur) => acc * cur, 1);
    expect(result).toBe(24);
  });

  it('concatenates an array of strings', () => {
    const result = reduce(['H', 'e', 'l', 'l', 'o'], (acc, cur) => acc + cur, '');
    expect(result).toBe('Hello');
  });

  it('works with an empty array and returns the initial value', () => {
    const result = reduce<number, number>([], (acc, cur) => acc + cur, 10);
    expect(result).toBe(10);
  });

  it('creates an object counting occurrences of elements', () => {
    const input = ['a', 'b', 'a', 'c', 'b', 'a'];
    const result = reduce(
      input,
      (acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    expect(result).toEqual({ a: 3, b: 2, c: 1 });
  });

  it('reduces an array to find the maximum value', () => {
    const result = reduce([5, 1, 8, 3, 10], (acc, cur) => (cur > acc ? cur : acc), -Infinity);
    expect(result).toBe(10);
  });

  it('reduces an array to find the minimum value', () => {
    const result = reduce([5, 1, 8, 3, 10], (acc, cur) => (cur < acc ? cur : acc), Infinity);
    expect(result).toBe(1);
  });

  it('flattens a nested array', () => {
    const input = [[1, 2], [3, 4], [5]];
    const result = reduce(input, (acc, cur) => acc.concat(cur), [] as number[]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
