import { describe, expect, expectTypeOf, it } from 'vitest';
import { minBy } from './minBy.ts';
import { pipe } from '../pipe.ts';

describe('minBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ score: 1 }, { score: 3 }, { score: 2 }],
        minBy(item => item.score)
      )
    ).toEqual({ score: 1 });
    expect(
      pipe(
        [] as Array<{ score: number }>,
        minBy(item => item.score)
      )
    ).toBeUndefined();
  });

  it('infers the selector parameter from the piped array', () => {
    const result = pipe(
      [{ score: 1 }, { score: 3 }],
      minBy(item => {
        expectTypeOf(item).toEqualTypeOf<{ score: number }>();
        return item.score;
      })
    );

    expectTypeOf(result).toEqualTypeOf<{ score: number } | undefined>();
  });

  it('infers the selector parameter from a readonly tuple', () => {
    const items = [{ score: 1 }, { score: 3 }] as const;
    const result = pipe(
      items,
      minBy(item => item.score)
    );

    expectTypeOf(result).toEqualTypeOf<(typeof items)[number] | undefined>();
  });
});
