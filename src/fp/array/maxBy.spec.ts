import { describe, expect, expectTypeOf, it } from 'vitest';
import { maxBy } from './maxBy.ts';
import { pipe } from '../pipe.ts';

describe('maxBy', () => {
  it('works with an array in a pipe', () => {
    expect(
      pipe(
        [{ score: 1 }, { score: 3 }, { score: 2 }],
        maxBy(item => item.score)
      )
    ).toEqual({ score: 3 });
  });

  it('includes undefined in the result type for arrays', () => {
    const result = pipe(
      [{ score: 1 }, { score: 3 }, { score: 2 }],
      maxBy(item => item.score)
    );

    expectTypeOf(result).toEqualTypeOf<{ score: number } | undefined>();
  });

  it('preserves non-empty tuple element types', () => {
    const items = [{ score: 1 }, { score: 3 }] as const;
    const result = pipe(
      items,
      maxBy(item => item.score)
    );

    expectTypeOf(result).toEqualTypeOf<(typeof items)[number]>();
  });

  it('preserves element types with a generic selector', () => {
    const getScore = <T extends { score: number }>(item: T) => item.score;
    const maximum = maxBy(getScore);
    const items = [{ score: 1, name: 'first' }] as const;

    expectTypeOf(maximum(items)).toEqualTypeOf<(typeof items)[number]>();
  });

  it('treats an explicit type argument as the element type for arrays', () => {
    const result = maxBy<number[]>(item => item.length)([[1], [1, 2]]);

    expectTypeOf(result).toEqualTypeOf<number[] | undefined>();
  });

  it('preserves an explicit element type for non-empty tuples', () => {
    const result = maxBy<number>(item => item)([1, 2] as const);

    expectTypeOf(result).toEqualTypeOf<number>();
  });
});
