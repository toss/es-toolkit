import { describe, expect, it, vi } from 'vitest';
import { differenceBy } from './differenceBy.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('differenceBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        differenceBy([2], value => (typeof value === 'number' ? value : value.id))
      )
    ).toEqual([{ id: 1 }]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((item: { id: number }) => item);

    expect(
      pipe(
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        map(spy),
        differenceBy([1], value => (typeof value === 'number' ? value : value.id)),
        take(2)
      )
    ).toEqual([{ id: 2 }, { id: 3 }]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
