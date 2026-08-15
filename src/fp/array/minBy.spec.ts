import { describe, expect, it } from 'vitest';
import { minBy } from './minBy.ts';
import { pipe } from '../pipe.ts';

describe('minBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ score: 1 }, { score: 3 }, { score: 2 }],
        minBy((item: { score: number }) => item.score)
      )
    ).toEqual({ score: 1 });
  });
});
