import { describe, expect, it, vi } from 'vitest';
import { intersection } from './intersection.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('intersection', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], intersection([2, 4]))).toEqual([2]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number) => value);

    expect(pipe([1, 2, 3, 4], map(spy), intersection([3, 4]), take(1))).toEqual([3]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
