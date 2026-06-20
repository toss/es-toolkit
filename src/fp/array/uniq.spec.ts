import { describe, expect, it } from 'vitest';
import { map } from './map.ts';
import { uniq } from './uniq.ts';
import { pipe } from '../pipe.ts';

describe('uniq', () => {
  it('removes duplicate values', () => {
    expect(pipe([1, 2, 2, 3, 3, 3], uniq())).toEqual([1, 2, 3]);
  });

  it('preserves the order of first occurrence', () => {
    expect(pipe([3, 1, 2, 1, 3], uniq())).toEqual([3, 1, 2]);
  });

  it('returns an empty array for empty input', () => {
    expect(pipe([] as number[], uniq())).toEqual([]);
  });

  it('composes with other operators in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        map(x => x % 2),
        uniq()
      )
    ).toEqual([1, 0]);
  });
});
