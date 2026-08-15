import { describe, expect, it, vi } from 'vitest';
import { differenceWith } from './differenceWith.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('differenceWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        differenceWith([2], (item, id) => item.id === id)
      )
    ).toEqual([{ id: 1 }]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((item: { id: number }) => item);

    expect(
      pipe(
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        map(spy),
        differenceWith([1], (item, id) => item.id === id),
        take(2)
      )
    ).toEqual([{ id: 2 }, { id: 3 }]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
