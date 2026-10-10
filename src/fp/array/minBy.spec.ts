import { describe, expect, expectTypeOf, it } from 'vitest';
import { minBy } from './minBy.ts';
import { pipe } from '../pipe.ts';

describe('minBy', () => {
  it('works with an array in a pipe', () => {
    expect(
      pipe(
        [{ score: 1 }, { score: 3 }, { score: 2 }],
        minBy(item => item.score)
      )
    ).toEqual({ score: 1 });
  });

  it('includes undefined in the result type for arrays', () => {
    const result = pipe(
      [{ score: 1 }, { score: 3 }, { score: 2 }],
      minBy(item => item.score)
    );

    expectTypeOf(result).toEqualTypeOf<{ score: number } | undefined>();
  });

  it('preserves non-empty tuple element types', () => {
    const items = [{ score: 1 }, { score: 3 }] as const;
    const result = pipe(
      items,
      minBy(item => item.score)
    );

    expectTypeOf(result).toEqualTypeOf<(typeof items)[number]>();
  });

  it('preserves element types with a generic selector', () => {
    const getScore = <T extends { score: number }>(item: T) => item.score;
    const minimum = minBy(getScore);
    const items = [{ score: 1, name: 'first' }] as const;

    expectTypeOf(minimum(items)).toEqualTypeOf<(typeof items)[number]>();
  });

  it('treats an explicit type argument as the element type for arrays', () => {
    const result = minBy<number[]>(item => item.length)([[1], [1, 2]]);

    expectTypeOf(result).toEqualTypeOf<number[] | undefined>();
  });

  it('preserves an explicit element type for non-empty tuples', () => {
    const result = minBy<number>(item => item)([1, 2] as const);

    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
