import { describe, expect, expectTypeOf, it } from 'vitest';
import { pick } from './pick.ts';
import { pipe } from '../pipe.ts';

describe('pick', () => {
  it('keeps only the picked keys', () => {
    expect(pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c']))).toEqual({ a: 1, c: 3 });
  });

  it('ignores keys that are not present on the object', () => {
    expect(pipe({ a: 1, b: 2 } as { a: number; b: number; c?: number }, pick(['a', 'c']))).toEqual({ a: 1 });
  });

  it('returns an empty object when no keys are picked', () => {
    expect(pipe({ a: 1, b: 2 }, pick([] as Array<'a' | 'b'>))).toEqual({});
  });

  it('picks from each member of a type union separately', () => {
    type A = { type: 'a'; a: number };
    type B = { type: 'b'; b: string };
    type Union = A | B;

    const result = pipe({ type: 'a', a: 1 } as Union, pick(['type', 'b']));

    expectTypeOf(result).toEqualTypeOf<Pick<A, 'type'> | Pick<B, 'type' | 'b'>>();
    expect(result).toEqual({ type: 'a' });
  });
});
