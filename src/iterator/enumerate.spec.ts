import { describe, expect, it } from 'vitest';
import { enumerate } from './enumerate';

describe('enumerate', () => {
  it('pairs each element with its index starting at 0', () => {
    expect([...enumerate(['a', 'b', 'c'])]).toEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ]);
  });

  it('supports a custom start index', () => {
    expect([...enumerate(['a', 'b', 'c'], 1)]).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('handles empty iterables', () => {
    expect([...enumerate([])]).toEqual([]);
  });

  it('works with non-array iterables', () => {
    expect([...enumerate(new Set(['x', 'y', 'z']))]).toEqual([
      [0, 'x'],
      [1, 'y'],
      [2, 'z'],
    ]);
  });

  it('works with generator functions', () => {
    function* words() {
      yield 'hello';
      yield 'world';
    }
    expect([...enumerate(words())]).toEqual([
      [0, 'hello'],
      [1, 'world'],
    ]);
  });

  it('is lazy. does not consume the iterable until iterated', () => {
    let consumed = false;
    function* lazy() {
      consumed = true;
      yield 'a';
    }
    const result = enumerate(lazy(), 1);
    expect(consumed).toBe(false);
    expect([...result]).toEqual([[1, 'a']]);
    expect(consumed).toBe(true);
  });
});
