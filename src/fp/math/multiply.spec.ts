import { describe, expect, it } from 'vitest';
import { multiply } from './multiply.ts';
import { map } from '../array/map.ts';
import { pipe } from '../pipe.ts';

describe('multiply', () => {
  it('multiplies the piped value by the multiplicand', () => {
    expect(pipe(3, multiply(2))).toBe(6);
  });

  it('works as a map callback', () => {
    expect(pipe([1, 2, 3], map(multiply(3)))).toEqual([3, 6, 9]);
  });

  it('multiplies by zero', () => {
    expect(pipe(42, multiply(0))).toBe(0);
  });

  it('handles negative multiplicands', () => {
    expect(pipe(5, multiply(-2))).toBe(-10);
  });
});
