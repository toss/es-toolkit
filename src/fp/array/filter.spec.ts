import { describe, expect, it, vi } from 'vitest';
import { filter } from './filter.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('filter', () => {
  it('keeps only the elements that pass the predicate', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        filter(x => x % 2 === 0)
      )
    ).toEqual([2, 4]);
  });

  it('passes the index as the second argument', () => {
    expect(
      pipe(
        [10, 20, 30, 40],
        filter((_value, index) => index % 2 === 0)
      )
    ).toEqual([10, 30]);
  });

  it('narrows the element type with a type guard', () => {
    const result = pipe(
      [1, 'a', 2, 'b'],
      filter((x): x is string => typeof x === 'string')
    );

    expect(result).toEqual(['a', 'b']);
    // Type-level check: `result` is `string[]`.
    expect(result.map(s => s.toUpperCase())).toEqual(['A', 'B']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(
      pipe(
        [1, 3, 5],
        filter(x => x % 2 === 0)
      )
    ).toEqual([]);
  });

  it('fuses with map and take in a single lazy pass', () => {
    const mapSpy = vi.fn((x: number) => x * x);
    const filterSpy = vi.fn((x: number) => x % 2 === 0);

    const result = pipe([1, 2, 3, 4, 5, 6, 7, 8], map(mapSpy), filter(filterSpy), take(2));

    expect(result).toEqual([4, 16]);
    // Only walks 1..4: squares 1,4,9,16; keeps 4 and 16, then stops.
    expect(mapSpy).toHaveBeenCalledTimes(4);
    expect(filterSpy).toHaveBeenCalledTimes(4);
  });
});
