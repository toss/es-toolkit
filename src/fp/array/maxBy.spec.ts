import { describe, expect, expectTypeOf, it } from 'vitest';
import { maxBy } from './maxBy.ts';
import { pipe } from '../pipe.ts';

describe('maxBy', () => {
  it('works in a pipe', () => {
    expect(
      pipe(
        [{ score: 1 }, { score: 3 }, { score: 2 }],
        maxBy(item => item.score)
      )
    ).toEqual({ score: 3 });
    expect(
      pipe(
        [] as Array<{ score: number }>,
        maxBy(item => item.score)
      )
    ).toBeUndefined();
  });

  it('infers the selector parameter from the piped array', () => {
    const result = pipe(
      [{ score: 1 }, { score: 3 }],
      maxBy(item => {
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
      maxBy(item => item.score)
    );

    expectTypeOf(result).toEqualTypeOf<(typeof items)[number] | undefined>();
  });
});
