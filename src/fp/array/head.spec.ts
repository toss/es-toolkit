import { describe, expect, expectTypeOf, it } from 'vitest';
import { head } from './head.ts';
import { pipe } from '../pipe.ts';

describe('head', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], head())).toEqual(1);
    expect(pipe([] as number[], head())).toBeUndefined();
  });

  it('infers the element type from the piped array', () => {
    expectTypeOf(pipe([1, 2, 3], head())).toEqualTypeOf<number | undefined>();
    expectTypeOf(pipe([1, 2, 3] as const, head())).toEqualTypeOf<1 | 2 | 3 | undefined>();
  });
});
