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
});
