import { describe, expect, it } from 'vitest';
import { chunk } from './chunk.ts';

describe('chunk', () => {
  it('groups elements into arrays of the given size', () => {
    expect(chunk([1, 2, 3, 4].values(), 2).toArray()).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('keeps a shorter final chunk', () => {
    expect(chunk([1, 2, 3, 4, 5].values(), 2).toArray()).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('yields nothing for an empty source', () => {
    expect(chunk([].values(), 3).toArray()).toEqual([]);
  });

  it('throws when size is not a positive integer', () => {
    expect(() => chunk([1].values(), 0)).toThrow();
    expect(() => chunk([1].values(), -1)).toThrow();
    expect(() => chunk([1].values(), 1.5)).toThrow();
  });

  it('is lazy and bounded by take over an infinite source', () => {
    let n = 0;
    const infinite: Iterator<number> = { next: () => ({ value: n++, done: false }) };

    expect(chunk(infinite, 2).take(2).toArray()).toEqual([
      [0, 1],
      [2, 3],
    ]);
  });

  it('is single-shot once consumed', () => {
    const it = chunk([1, 2, 3].values(), 2);
    expect(it.toArray()).toEqual([[1, 2], [3]]);
    expect(it.toArray()).toEqual([]);
  });
});
