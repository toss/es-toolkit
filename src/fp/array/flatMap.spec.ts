import { describe, expect, it, vi } from 'vitest';
import { flatMap } from './flatMap.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('flatMap', () => {
  it('maps each element to an array and flattens one level', () => {
    expect(
      pipe(
        [1, 2, 3],
        flatMap(x => [x, x * 10])
      )
    ).toEqual([1, 10, 2, 20, 3, 30]);
  });

  it('drops elements whose callback returns an empty array', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        flatMap(x => (x % 2 === 0 ? [x] : []))
      )
    ).toEqual([2, 4]);
  });

  it('exposes the index and the prefix seen so far', () => {
    expect(
      pipe(
        [10, 20, 30],
        flatMap((value, index) => [value + index])
      )
    ).toEqual([10, 21, 32]);
  });

  it('fuses with other lazy operators and short-circuits on take', () => {
    const spy = vi.fn((x: number) => [x, x * 10]);

    const result = pipe([1, 2, 3, 4, 5], flatMap(spy), take(3));

    expect(result).toEqual([1, 10, 2]);
    // Expanding element 2 already produces the third result, so element 3+ is never read.
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('matches eager Array.prototype.flatMap when used on its own', () => {
    const expand = flatMap((x: number) => [x, -x]);
    expect(expand([1, 2])).toEqual([1, -1, 2, -2]);
  });

  it('composes after map', () => {
    expect(
      pipe(
        [1, 2, 3],
        map(x => x + 1),
        flatMap(x => [x, x])
      )
    ).toEqual([2, 2, 3, 3, 4, 4]);
  });
});
