import { describe, expect, it } from 'vitest';
import { xorWith } from './xorWith.ts';
import { pipe } from '../pipe.ts';

describe('xorWith', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
      )
    ).toEqual([{ id: 1 }, { id: 3 }]);
  });
});
