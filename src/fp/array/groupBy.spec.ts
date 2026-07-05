import { describe, expect, it } from 'vitest';
import { groupBy } from './groupBy.ts';
import { pipe } from '../pipe.ts';

describe('groupBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        ['a', 'bb', 'c'],
        groupBy(value => value.length)
      )
    ).toEqual({ 1: ['a', 'c'], 2: ['bb'] });
  });
});
