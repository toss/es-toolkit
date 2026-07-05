import { describe, expect, it, vi } from 'vitest';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('take', () => {
  it('returns the first `count` elements', () => {
    expect(pipe([1, 2, 3, 4, 5], take(3))).toEqual([1, 2, 3]);
  });

  it('returns the whole array when `count` exceeds the length', () => {
    expect(pipe([1, 2, 3], take(5))).toEqual([1, 2, 3]);
  });

  it('returns an empty array for a count of 0', () => {
    expect(pipe([1, 2, 3], take(0))).toEqual([]);
  });

  it('terminates preceding lazy operators early', () => {
    const spy = vi.fn((x: number) => x + 1);

    const result = pipe([1, 2, 3, 4, 5, 6], map(spy), take(2));

    expect(result).toEqual([2, 3]);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('truncates a non-integer count toward zero (eager fallback)', () => {
    expect(pipe([1, 2, 3, 4], take(2.9))).toEqual([1, 2]);
  });

  it('matches es-toolkit `take` for negative counts (drops from the end)', () => {
    expect(pipe([1, 2, 3, 4], take(-1))).toEqual([1, 2, 3]);
  });
});
