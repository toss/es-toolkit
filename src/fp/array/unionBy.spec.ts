import { describe, expect, it } from 'vitest';
import { unionBy } from './unionBy.ts';
import { pipe } from '../pipe.ts';

describe('unionBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ id: 1 }, { id: 2 }],
        unionBy([{ id: 2 }, { id: 3 }], item => item.id)
      )
    ).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});
