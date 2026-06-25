import { describe, expect, it, vi } from 'vitest';
import { forEach } from './forEach.ts';
import { take } from './take.ts';
import { pipe } from '../pipe.ts';

describe('forEach', () => {
  it('runs the callback and returns the original array', () => {
    const input = [1, 2, 3];
    const spy = vi.fn();
    const result = pipe(input, forEach(spy));

    expect(result).toBe(input);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(2, 2, 1, input);
  });

  it('supports lazy evaluation with a short-circuiting operator', () => {
    const spy = vi.fn();

    expect(pipe([1, 2, 3, 4], forEach(spy), take(2))).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
