import { describe, expect, it, vi } from 'vitest';
import { drop } from './drop.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('drop', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3, 4], drop(2))).toEqual([3, 4]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number) => value);

    expect(pipe([1, 2, 3, 4], map(spy), drop(2), take(1))).toEqual([3]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
