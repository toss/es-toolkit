import { describe, expect, expectTypeOf, it } from 'vitest';
import { last } from './last.ts';
import { pipe } from '../pipe.ts';

describe('last', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], last())).toEqual(3);
    expect(pipe([] as number[], last())).toBeUndefined();
  });

  it('infers the element type from the piped array', () => {
    expectTypeOf(pipe([1, 2, 3], last())).toEqualTypeOf<number | undefined>();
    expectTypeOf(pipe([1, 2, 3] as const, last())).toEqualTypeOf<1 | 2 | 3 | undefined>();
  });
});
