import { describe, expect, it } from 'vitest';
import { dropRightWhile } from './dropRightWhile.ts';
import { pipe } from '../pipe.ts';

describe('dropRightWhile', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        dropRightWhile(value => value > 2)
      )
    ).toEqual([1, 2]);
  });
});
