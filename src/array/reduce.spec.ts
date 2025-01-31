import { describe, expect, it } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('sums an array of numbers', () => expect(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur, 0)).toBe(15));
  it('multiplies an array of numbers', () => expect(reduce([1, 2, 3, 4], (acc, cur) => acc * cur, 1)).toBe(24));
  it('concatenates an array of strings', () => expect(reduce(['H', 'e', 'l', 'l', 'o'], (acc, cur) => acc + cur, '')).toBe('Hello'));
  it('works with an empty array and returns the initial value', () => expect(reduce([], (acc, cur) => acc + cur, 10)).toBe(10));
  it('creates an object counting occurrences of elements', () => expect(reduce(['a', 'b', 'a', 'c', 'b', 'a'], (acc, cur) => ((acc[cur] = (acc[cur] ?? 0) + 1), acc), {} as Record<string, number>)).toEqual({ a: 3, b: 2, c: 1 }));
  it('reduces an array to find the maximum value', () => expect(reduce([5, 1, 8, 3, 10], (acc, cur) => (cur > acc ? cur : acc), -Infinity)).toBe(10));
  it('reduces an array to find the minimum value', () => expect(reduce([5, 1, 8, 3, 10], (acc, cur) => (cur < acc ? cur : acc), Infinity)).toBe(1));
  it('flattens a nested array', () => expect(reduce([[1, 2], [3, 4], [5]], (acc, cur) => acc.concat(cur), [] as number[])).toEqual([1, 2, 3, 4, 5]));
});
