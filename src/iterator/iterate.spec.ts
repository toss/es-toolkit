import { describe, expect, it, vi } from 'vitest';
import { iterate } from './iterate.ts';

describe('iterate', () => {
  it('starts with the seed and applies the function repeatedly', () => {
    expect(
      iterate(1, x => x * 2)
        .take(5)
        .toArray()
    ).toEqual([1, 2, 4, 8, 16]);
  });

  it('emits the seed first even when bounded to one element', () => {
    expect(
      iterate(42, x => x + 1)
        .take(1)
        .toArray()
    ).toEqual([42]);
  });

  it('only invokes the function as many times as consumed', () => {
    const next = vi.fn((x: number) => x + 1);

    iterate(0, next).take(3).toArray();

    // seed + 2 transitions to produce 3 values
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('is lazy: nothing runs before consumption', () => {
    const next = vi.fn((x: number) => x + 1);

    iterate(0, next);

    expect(next).not.toHaveBeenCalled();
  });
});
