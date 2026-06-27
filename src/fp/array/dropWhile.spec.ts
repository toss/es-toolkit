import { describe, expect, it, vi } from 'vitest';
import { dropWhile } from './dropWhile.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('dropWhile', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 1],
        dropWhile(value => value < 3)
      )
    ).toEqual([3, 1]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number) => value);

    expect(
      pipe(
        [1, 2, 3, 4],
        map(spy),
        dropWhile(value => value < 3),
        take(1)
      )
    ).toEqual([3]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
