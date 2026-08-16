import { describe, expect, it } from 'vitest';
import { findLast } from './findLast.ts';
import { pipe } from '../pipe.ts';

describe('findLast', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        findLast(value => value % 2 === 0)
      )
    ).toEqual(4);
  });
});
