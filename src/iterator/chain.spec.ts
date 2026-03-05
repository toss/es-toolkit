import { describe, expect, it } from 'vitest';
import { chain } from './chain';

describe('chain', () => {
  it('chains multiple arrays in order', () => {
    expect([...chain([1, 2, 3], [4, 5, 6])]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('works with a single iterable', () => {
    expect([...chain([1, 2, 3])]).toEqual([1, 2, 3]);
  });

  it('works with no iterables', () => {
    expect([...chain()]).toEqual([]);
  });

  it('works with empty iterables', () => {
    expect([...chain([], [1, 2], [])]).toEqual([1, 2]);
  });

  it('works with non-array iterables', () => {
    expect([...chain(new Set([1, 2]), new Map([[3, 'a']]).keys())]).toEqual([1, 2, 3]);
  });

  it('works with generator functions', () => {
    function* gen() {
      yield 4;
      yield 5;
    }
    expect([...chain([1, 2, 3], gen())]).toEqual([1, 2, 3, 4, 5]);
  });

  it('is lazy. does not consume iterables until iterated', () => {
    let consumed = false;
    function* lazy() {
      consumed = true;
      yield 1;
    }
    const result = chain(lazy());
    expect(consumed).toBe(false);
    expect([...result]).toStrictEqual([1]);
    expect(consumed).toBe(true);
  });
});
