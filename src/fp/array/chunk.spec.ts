import { describe, expect, it } from 'vitest';
import { chunk } from './chunk.ts';
import { map } from './map.ts';
import { pipe } from '../pipe.ts';

describe('chunk', () => {
  it('splits an array into chunks of the given size', () => {
    expect(pipe([1, 2, 3, 4, 5], chunk(2))).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns a single chunk when the size is larger than the array', () => {
    expect(pipe([1, 2, 3], chunk(10))).toEqual([[1, 2, 3]]);
  });

  it('returns an empty array for empty input', () => {
    expect(pipe([] as number[], chunk(2))).toEqual([]);
  });

  it('composes with other operators in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        map(x => x * 10),
        chunk(2)
      )
    ).toEqual([
      [10, 20],
      [30, 40],
    ]);
  });
});
