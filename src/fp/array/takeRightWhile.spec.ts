import { describe, expect, it } from 'vitest';
import { takeRightWhile } from './takeRightWhile.ts';
import { pipe } from '../pipe.ts';

describe('takeRightWhile', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        takeRightWhile(value => value > 2)
      )
    ).toEqual([3, 4]);
  });
});
