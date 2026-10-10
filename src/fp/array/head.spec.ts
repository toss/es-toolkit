import { describe, expect, expectTypeOf, it } from 'vitest';
import { head } from './head.ts';
import { pipe } from '../pipe.ts';

describe('head', () => {
  it('works with an array in a pipe', () => {
    expect(pipe([1, 2, 3], head())).toEqual(1);
    expectTypeOf(pipe([1, 2, 3], head())).toEqualTypeOf<number | undefined>();
  });

  it('preserves non-empty tuple element types', () => {
    expectTypeOf(pipe([1, 2, 3] as const, head())).toEqualTypeOf<1 | 2 | 3>();
  });

  it('infers element types when the returned function receives an array', () => {
    expectTypeOf(head()([1, 2, 3])).toEqualTypeOf<number | undefined>();
    expectTypeOf(head()(['first', 'second'])).toEqualTypeOf<string | undefined>();
  });

  it('infers undefined for an empty tuple', () => {
    expectTypeOf(head()([] as const)).toEqualTypeOf<undefined>();
  });

  it('preserves tuple element types with an explicit type argument', () => {
    expectTypeOf(head<number>()([1, 2, 3] as const)).toEqualTypeOf<1 | 2 | 3>();
  });
});
