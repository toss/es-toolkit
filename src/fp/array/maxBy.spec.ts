import { describe, expect, it } from 'vitest';
import { maxBy } from './maxBy.ts';
import { pipe } from '../pipe.ts';

describe('maxBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ score: 1 }, { score: 3 }, { score: 2 }],
        maxBy((item: { score: number }) => item.score)
      )
    ).toEqual({ score: 3 });
  });
});
