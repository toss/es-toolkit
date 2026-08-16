import { describe, expect, it, vi } from 'vitest';
import { flatten } from './flatten.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('flatten', () => {
  it('works in a pipe', () => {
    expect(pipe([1, [2, [3]]], flatten(2))).toEqual([1, 2, 3]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number[]) => value);

    expect(pipe([[1], [2], [3]], map(spy), flatten(), take(2))).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
