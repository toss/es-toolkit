import { describe, expect, it, vi } from 'vitest';
import { flattenDeep } from './flattenDeep.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('flattenDeep', () => {
  it('works in a pipe', () => {
    expect(pipe([1, [2, [3]]], flattenDeep())).toEqual([1, 2, 3]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: Array<number | number[]>) => value);

    expect(pipe([[1], [2, [3]], [4]], map(spy), flattenDeep(), take(3))).toEqual([1, 2, 3]);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
