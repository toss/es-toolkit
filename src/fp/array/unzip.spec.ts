import { describe, expect, it } from 'vitest';
import { unzip } from './unzip.ts';
import { pipe } from '../pipe.ts';

describe('unzip', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [
          [1, 'a'],
          [2, 'b'],
        ] as Array<[number, string]>,
        unzip()
      )
    ).toEqual([
      [1, 2],
      ['a', 'b'],
    ]);
  });
});
