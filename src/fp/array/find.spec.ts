import { describe, expect, it } from 'vitest';
import { find } from './find.ts';
import { pipe } from '../pipe.ts';

describe('find', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [1, 2, 3, 4],
        find(value => value > 2)
      )
    ).toEqual(3);
  });
});
