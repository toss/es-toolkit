import { describe, expect, it } from 'vitest';
import { unzipWith } from './unzipWith.ts';
import { pipe } from '../pipe.ts';

describe('unzipWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [
          [1, 10],
          [2, 20],
        ],
        unzipWith((a, b) => a + b)
      )
    ).toEqual([3, 30]);
  });
});
