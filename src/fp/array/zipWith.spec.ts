import { describe, expect, it } from 'vitest';
import { zipWith } from './zipWith.ts';
import { pipe } from '../pipe.ts';

describe('zipWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2],
        zipWith([10, 20], (a, b) => a + b)
      )
    ).toEqual([11, 22]);
  });

  it('uses the longest input length and passes undefined for missing values', () => {
    expect(
      pipe(
        [1, 2, 3],
        zipWith(['a', 'b'] as readonly unknown[], (a, b, index) => [a, b, index])
      )
    ).toEqual([
      [1, 'a', 0],
      [2, 'b', 1],
      [3, undefined, 2],
    ]);
  });
});
