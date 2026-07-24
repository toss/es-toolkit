import { describe, expect, it, vi } from 'vitest';
import { takeWhile } from './takeWhile.ts';

describe('takeWhile', () => {
  it('yields the leading run of matching elements', () => {
    expect(takeWhile([1, 2, 3, 4, 1].values(), x => x < 3).toArray()).toEqual([1, 2]);
  });

  it('passes the index to the predicate', () => {
    const indices: number[] = [];
    takeWhile([10, 20, 30].values(), (_value, index) => {
      indices.push(index);
      return index < 1;
    }).toArray();
    expect(indices).toEqual([0, 1]);
  });

  it('yields nothing when the first element fails', () => {
    expect(takeWhile([5, 1, 2].values(), x => x < 3).toArray()).toEqual([]);
  });

  it('stops pulling from the source after the predicate fails', () => {
    const pulled: number[] = [];
    function* source() {
      for (const value of [1, 2, 3, 4, 5]) {
        pulled.push(value);
        yield value;
      }
    }

    takeWhile(source(), x => x < 3).toArray();

    // pulls 1, 2, then 3 (which fails) — never reaches 4 or 5
    expect(pulled).toEqual([1, 2, 3]);
  });

  it('terminates an infinite source', () => {
    let n = 0;
    const infinite: Iterator<number> = { next: () => ({ value: n++, done: false }) };

    expect(takeWhile(infinite, x => x < 4).toArray()).toEqual([0, 1, 2, 3]);
  });

  it('is single-shot once consumed', () => {
    const it = takeWhile([1, 2, 9].values(), x => x < 5);
    expect(it.toArray()).toEqual([1, 2]);
    expect(it.toArray()).toEqual([]);
  });

  it('chains with native iterator helpers', () => {
    const spy = vi.fn((x: number) => x * 10);
    const result = takeWhile([1, 2, 3, 4].values(), x => x < 3)
      .map(spy)
      .toArray();
    expect(result).toEqual([10, 20]);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
