import { describe, expect, it } from 'vitest';
import { unionWith } from './unionWith.ts';
import { pipe } from '../pipe.ts';

describe('unionWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
      )
    ).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});
