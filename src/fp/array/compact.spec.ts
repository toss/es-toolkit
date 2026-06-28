import { describe, expect, it, vi } from 'vitest';
import { compact } from './compact.ts';
import { map } from './map.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('compact', () => {
  it('works in a pipe', () => {
    expect(pipe([0, 1, false, 2, '', 3], compact())).toEqual([1, 2, 3]);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn((value: number) => value);

    expect(pipe([0, 1, 2, 3, 4], map(spy), compact(), take(2))).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
