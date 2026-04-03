import { describe, expect, it } from 'vitest';
import { zipIterable } from './zipIterable.ts';

describe('zipIterable', () => {
  it('zips two arrays of equal length', () => {
    expect([...zipIterable([1, 2, 3], ['a', 'b', 'c'])]).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('stops at the shortest iterable', () => {
    expect([...zipIterable([1, 2, 3], ['a', 'b'])]).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('handles empty iterables', () => {
    expect([...zipIterable([], [1, 2, 3])]).toEqual([]);
  });

  it('works with more than two iterables', () => {
    expect([...zipIterable([1, 2], ['a', 'b'], [true, false])]).toEqual([
      [1, 'a', true],
      [2, 'b', false],
    ]);
  });

  it('works with non-array iterables', () => {
    const set = new Set(['x', 'y']);
    expect([...zipIterable(set, [1, 2])]).toEqual([
      ['x', 1],
      ['y', 2],
    ]);
  });

  it('is lazy. does not consume iterables until iterated', () => {
    let consumed = false;
    function* lazy() {
      consumed = true;
      yield 1;
    }
    const result = zipIterable(lazy(), [1]);
    expect(consumed).toBe(false);
    expect([...result]).toStrictEqual([[1, 1]]);
    expect(consumed).toBe(true);
  });
});
