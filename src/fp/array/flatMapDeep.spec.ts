import { describe, expect, it, vi } from 'vitest';
import { flatMapDeep } from './flatMapDeep.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('flatMapDeep', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2],
        flatMapDeep(value => [[value, value]])
      )
    ).toEqual([1, 1, 2, 2]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number) => [[value, value * 10]]);

    expect(pipe([1, 2, 3], flatMapDeep(spy), take(3))).toEqual([1, 10, 2]);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
