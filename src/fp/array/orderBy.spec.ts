import { describe, expect, it } from 'vitest';
import { orderBy } from './orderBy.ts';
import { pipe } from '../pipe.ts';

describe('orderBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [
          { name: 'a', age: 2 },
          { name: 'b', age: 1 },
        ],
        orderBy(['age'], ['asc'])
      )
    ).toEqual([
      { name: 'b', age: 1 },
      { name: 'a', age: 2 },
    ]);
  });
});
