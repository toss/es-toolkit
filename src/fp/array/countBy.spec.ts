import { describe, expect, it } from 'vitest';
import { countBy } from './countBy.ts';
import { pipe } from '../pipe.ts';

describe('countBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        ['a', 'bb', 'c'],
        countBy(value => value.length)
      )
    ).toEqual({ 1: 2, 2: 1 });
  });
});
