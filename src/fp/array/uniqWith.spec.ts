import { describe, expect, it, vi } from 'vitest';
import { map } from './map.ts';
import { take } from './take.ts';
import { uniqWith } from './uniqWith.ts';
import { pipe } from '../pipe.ts';

describe('uniqWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 1 }, { id: 2 }],
        uniqWith((a, b) => a.id === b.id)
      )
    ).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((item: { id: number }) => item);

    expect(
      pipe(
        [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }],
        map(spy),
        uniqWith((a, b) => a.id === b.id),
        take(2)
      )
    ).toEqual([{ id: 1 }, { id: 2 }]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
