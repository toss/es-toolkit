import { describe, expect, expectTypeOf, it } from 'vitest';
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

  it('types missing grouped keys as possibly undefined in a pipe', () => {
    type Grocery = { name: string; category: 'fruit' | 'vegetable' | 'meat' };

    const result = pipe(
      [{ name: 'apple', category: 'fruit' }],
      groupBy((grocery: Grocery) => grocery.category)
    );

    expectTypeOf(result.meat).toEqualTypeOf<Grocery[] | undefined>();
  });
});
