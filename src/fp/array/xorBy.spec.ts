import { describe, expect, it } from 'vitest';
import { xorBy } from './xorBy.ts';
import { pipe } from '../pipe.ts';

describe('xorBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        xorBy([{ id: 2 }, { id: 3 }], item => item.id)
      )
    ).toEqual([{ id: 1 }, { id: 3 }]);
  });
});
