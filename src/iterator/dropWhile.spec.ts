import { describe, expect, it } from 'vitest';
import { dropWhile } from './dropWhile.ts';

describe('dropWhile', () => {
  it('drops the leading run and yields the rest', () => {
    expect(dropWhile([1, 2, 3, 1].values(), x => x < 3).toArray()).toEqual([3, 1]);
  });

  it('yields everything when the first element fails the predicate', () => {
    expect(dropWhile([5, 1, 2].values(), x => x < 3).toArray()).toEqual([5, 1, 2]);
  });

  it('yields nothing when every element is dropped', () => {
    expect(dropWhile([1, 2, 1].values(), x => x < 3).toArray()).toEqual([]);
  });

  it('passes the index to the predicate', () => {
    const indices: number[] = [];
    dropWhile([10, 20, 30].values(), (_value, index) => {
      indices.push(index);
      return index < 1;
    }).toArray();
    expect(indices).toEqual([0, 1]);
  });

  it('is single-shot once consumed', () => {
    const it = dropWhile([1, 2, 3, 4].values(), x => x < 3);
    expect(it.toArray()).toEqual([3, 4]);
    expect(it.toArray()).toEqual([]);
  });
});
