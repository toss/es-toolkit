import { describe, expect, it } from 'vitest';
import { range } from './range.ts';

describe('range', () => {
  it('yields 0..end with a single argument', () => {
    expect(range(4).toArray()).toEqual([0, 1, 2, 3]);
  });

  it('yields start..end with two arguments', () => {
    expect(range(1, 4).toArray()).toEqual([1, 2, 3]);
  });

  it('yields start..end with a custom step', () => {
    expect(range(0, 20, 5).toArray()).toEqual([0, 5, 10, 15]);
  });

  it('supports a negative step', () => {
    expect(range(0, -4, -1).toArray()).toEqual([0, -1, -2, -3]);
  });

  it('yields nothing for an empty range', () => {
    expect(range(0).toArray()).toEqual([]);
    expect(range(5, 5).toArray()).toEqual([]);
  });

  it('is lazy and bounded by take over an unbounded range', () => {
    expect(range(0, Infinity).take(3).toArray()).toEqual([0, 1, 2]);
  });

  it('throws when the step is not a non-zero integer', () => {
    expect(() => range(0, 10, 0)).toThrow();
    expect(() => range(0, 10, 1.5)).toThrow();
  });

  it('is single-shot once consumed', () => {
    const it = range(3);
    expect(it.toArray()).toEqual([0, 1, 2]);
    expect(it.toArray()).toEqual([]);
  });
});
