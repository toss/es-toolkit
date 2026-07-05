import { describe, expect, it, vi } from 'vitest';
import { map } from './map.ts';
import { takeWhile } from './takeWhile.ts';
import { pipe } from '../pipe.ts';

describe('takeWhile', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 1],
        takeWhile(value => value < 3)
      )
    ).toEqual([1, 2]);
  });

  it('short-circuits preceding lazy operators', () => {
    const spy = vi.fn((value: number) => value);

    expect(
      pipe(
        [1, 2, 3, 4],
        map(spy),
        takeWhile(value => value < 3)
      )
    ).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
