import { describe, expect, it } from 'vitest';
import { keyBy } from './keyBy.ts';
import { pipe } from '../pipe.ts';

describe('keyBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [
          { id: 'a', value: 1 },
          { id: 'b', value: 2 },
        ],
        keyBy(item => item.id)
      )
    ).toEqual({ a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } });
  });
});
