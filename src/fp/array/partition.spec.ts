import { describe, expect, it } from 'vitest';
import { partition } from './partition.ts';
import { pipe } from '../pipe.ts';

describe('partition', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        partition(value => value % 2 === 0)
      )
    ).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });
});
