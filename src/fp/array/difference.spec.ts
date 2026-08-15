import { describe, expect, it, vi } from 'vitest';
import { difference } from './difference.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('difference', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], difference([2, 4]))).toEqual([1, 3]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number) => value);

    expect(pipe([1, 2, 3, 4], map(spy), difference([1]), take(2))).toEqual([2, 3]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
