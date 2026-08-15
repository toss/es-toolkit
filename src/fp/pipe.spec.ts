import { describe, expect, it, vi } from 'vitest';
import { filter } from './array/filter.ts';
import { map } from './array/map.ts';
import { take } from './array/take.ts';
import { takeWhile } from './array/takeWhile.ts';
import { uniq } from './array/uniq.ts';
import { pipe } from './pipe.ts';

describe('pipe', () => {
  it('returns the value unchanged when no functions are given', () => {
    expect(pipe(42)).toBe(42);
  });

  it('applies a single function', () => {
    expect(pipe(2, x => x + 1)).toBe(3);
  });

  it('threads the value left-to-right through every function', () => {
    expect(
      pipe(
        1,
        x => x + 1,
        x => x * 3,
        x => `value: ${x}`
      )
    ).toBe('value: 6');
  });

  it('works with arbitrary unary functions', () => {
    expect(
      pipe(
        '  Hello  ',
        s => s.trim(),
        s => s.toLowerCase()
      )
    ).toBe('hello');
  });

  it('produces the flagship example result', () => {
    expect(
      pipe(
        [1, 2, 3],
        map(x => x * 3)
      )
    ).toEqual([3, 6, 9]);
  });

  it('fuses consecutive lazy operators and short-circuits on take', () => {
    const mapSpy = vi.fn((x: number) => x * x);

    const result = pipe(
      [1, 2, 3, 4, 5, 6, 7, 8],
      map(mapSpy),
      filter(x => x % 2 === 0),
      take(2)
    );

    expect(result).toEqual([4, 16]);
    expect(mapSpy).toHaveBeenCalledTimes(4);
  });

  it('interleaves lazy and non-lazy operators correctly', () => {
    const result = pipe(
      [1, 2, 3, 4],
      map(x => x % 3),
      uniq(),
      take(2)
    );

    expect(result).toEqual([1, 2]);
  });

  it('passes a per-stage index to lazy callbacks', () => {
    // `map`'s index counts the values it receives (after `filter`), not the
    // positions in the source array.
    expect(
      pipe(
        [10, 20, 30],
        filter(x => x > 10),
        map((value, index) => value + index)
      )
    ).toEqual([20, 31]);
  });

  it('uses lazy metadata from the first operator in a lazy group', () => {
    const mapSpy = vi.fn((x: number) => x * 2);

    const result = pipe(
      [1, 2, 3, 4],
      takeWhile(x => x < 3),
      map(mapSpy)
    );

    expect(result).toEqual([2, 4]);
    expect(mapSpy).toHaveBeenCalledTimes(2);
  });
});
