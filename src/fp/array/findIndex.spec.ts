import { describe, expect, it } from 'vitest';
import { findIndex } from './findIndex.ts';
import { pipe } from '../pipe.ts';

describe('findIndex', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        findIndex(value => value > 2)
      )
    ).toEqual(2);
  });
});
