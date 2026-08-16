import { describe, expect, it } from 'vitest';
import { isSubsetWith } from './isSubsetWith.ts';
import { pipe } from '../pipe.ts';

describe('isSubsetWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }],
        isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
      )
    ).toEqual(true);
  });
});
