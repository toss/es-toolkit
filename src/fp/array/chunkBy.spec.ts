import { describe, expect, it } from 'vitest';
import { chunkBy } from './chunkBy.ts';
import { pipe } from '../pipe.ts';

describe('chunkBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 1, 2, 3, 3],
        chunkBy(x => x)
      )
    ).toEqual([[1, 1], [2], [3, 3]]);
  });
});
