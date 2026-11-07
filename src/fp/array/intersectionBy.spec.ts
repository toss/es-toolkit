import { describe, expect, it, vi } from 'vitest';
import { intersectionBy } from './intersectionBy.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('intersectionBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        intersectionBy([2], value => (typeof value === 'number' ? value : value.id))
      )
    ).toEqual([{ id: 2 }]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((item: { id: number }) => item);

    expect(
      pipe(
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        map(spy),
        intersectionBy([3], value => (typeof value === 'number' ? value : value.id)),
        take(1)
      )
    ).toEqual([{ id: 3 }]);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('matches each mapped value at most once when evaluated lazily', () => {
    expect(pipe([2.1, 2.2], intersectionBy([2.3, 3.4], Math.floor), take(2))).toEqual([2.1]);
  });

  it('returns the same result when the same function is reused across lazy runs', () => {
    const intersectionByFloor = intersectionBy([2.3, 3.4], Math.floor);

    expect(pipe([2.1, 3.5], intersectionByFloor, take(2))).toEqual([2.1, 3.5]);
    expect(pipe([2.1, 3.5], intersectionByFloor, take(2))).toEqual([2.1, 3.5]);
  });
});
