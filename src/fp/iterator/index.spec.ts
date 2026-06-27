import { describe, expect, it, vi } from 'vitest';
import {
  chunk,
  count,
  drop,
  dropWhile,
  every,
  filter,
  find,
  flatMap,
  forEach,
  map,
  partition,
  reduce,
  scan,
  some,
  take,
  takeWhile,
  toArray,
  toSet,
  uniqBy,
  zip,
} from './index.ts';
import { pipe } from '../pipe.ts';

describe('es-toolkit/fp/iterator', () => {
  it('exports every Phase 1 operator', () => {
    for (const fn of [
      map,
      filter,
      take,
      drop,
      flatMap,
      takeWhile,
      dropWhile,
      chunk,
      scan,
      uniqBy,
      zip,
      toArray,
      toSet,
      count,
      partition,
      reduce,
      forEach,
      find,
      some,
      every,
    ]) {
      expect(typeof fn).toBe('function');
    }
  });

  it('composes native-delegating operators lazily in a pipe', () => {
    const result = pipe(
      [1, 2, 3, 4, 5, 6].values(),
      filter(x => x % 2 === 0),
      map(x => x * 10),
      toArray()
    );
    expect(result).toEqual([20, 40, 60]);
  });

  it('composes custom operators with native ones', () => {
    const result = pipe(
      [1, 2, 3, 4, 5].values(),
      takeWhile(x => x < 5),
      chunk(2),
      toArray()
    );
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('stays lazy across the whole pipe and terminates early', () => {
    const spy = vi.fn((x: number) => x * 2);

    const result = pipe(
      [1, 2, 3, 4, 5, 6, 7, 8].values(),
      map(spy),
      filter(x => x % 4 === 0),
      take(2),
      toArray()
    );

    expect(result).toEqual([4, 8]);
    // take(2) short-circuits: map runs only until the second match is found
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('runs a scan into a terminal count', () => {
    const total = pipe(
      [1, 2, 3].values(),
      scan((acc, x) => acc + x, 0),
      count()
    );
    expect(total).toBe(4);
  });

  it('supports terminal partition and toSet', () => {
    expect(
      pipe(
        [1, 2, 3, 4].values(),
        partition(x => x % 2 === 0)
      )
    ).toEqual([
      [2, 4],
      [1, 3],
    ]);
    expect(
      pipe(
        [1, 2, 2, 3].values(),
        uniqBy(x => x),
        toSet()
      )
    ).toEqual(new Set([1, 2, 3]));
  });

  it('zips the piped iterator with another', () => {
    expect(pipe([1, 2, 3].values(), zip(['a', 'b'].values()), toArray())).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('supports reduce, find, some, every, forEach terminals', () => {
    expect(
      pipe(
        [1, 2, 3].values(),
        reduce((acc, x) => acc + x, 0)
      )
    ).toBe(6);
    expect(
      pipe(
        [1, 2, 3, 4].values(),
        find(x => x > 2)
      )
    ).toBe(3);
    expect(
      pipe(
        [1, 2, 3].values(),
        some(x => x > 2)
      )
    ).toBe(true);
    expect(
      pipe(
        [2, 4, 6].values(),
        every(x => x % 2 === 0)
      )
    ).toBe(true);

    const seen: number[] = [];
    pipe(
      [1, 2, 3].values(),
      forEach(x => seen.push(x))
    );
    expect(seen).toEqual([1, 2, 3]);
  });

  it('flattens with flatMap and drops with drop/dropWhile', () => {
    expect(
      pipe(
        [1, 2].values(),
        flatMap(x => [x, x * 10]),
        toArray()
      )
    ).toEqual([1, 10, 2, 20]);
    expect(pipe([1, 2, 3, 4].values(), drop(2), toArray())).toEqual([3, 4]);
    expect(
      pipe(
        [1, 2, 3, 1].values(),
        dropWhile(x => x < 3),
        toArray()
      )
    ).toEqual([3, 1]);
  });
});
