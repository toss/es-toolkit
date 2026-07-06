import { describe, expect, it } from 'vitest';
import { findLastIndex } from './findLastIndex.ts';
import { pipe } from '../pipe.ts';

describe('findLastIndex', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        findLastIndex(value => value % 2 === 0)
      )
    ).toEqual(3);
  });
});
