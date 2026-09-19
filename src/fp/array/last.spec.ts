import { describe, expect, expectTypeOf, it } from 'vitest';
import { last } from './last.ts';
import { pipe } from '../pipe.ts';

describe('last', () => {
  it('works with an array in a pipe', () => {
    expect(pipe([1, 2, 3], last())).toEqual(3);
    expectTypeOf(pipe([1, 2, 3], last())).toEqualTypeOf<number | undefined>();
  });

  it('preserves non-empty tuple element types', () => {
    expectTypeOf(pipe([1, 2, 3] as const, last())).toEqualTypeOf<1 | 2 | 3>();
  });

  it('infers element types when the returned function receives an array', () => {
    expectTypeOf(last()([1, 2, 3])).toEqualTypeOf<number | undefined>();
    expectTypeOf(last()(['first', 'second'])).toEqualTypeOf<string | undefined>();
  });

  it('infers undefined for an empty tuple', () => {
    expectTypeOf(last()([] as const)).toEqualTypeOf<undefined>();
  });

  it('preserves tuple element types with an explicit type argument', () => {
    expectTypeOf(last<number>()([1, 2, 3] as const)).toEqualTypeOf<1 | 2 | 3>();
  });

  it('excludes undefined for a variadic tuple with a required last element', () => {
    expectTypeOf(pipe([1, 2, 3] as readonly [...number[], number], last())).toEqualTypeOf<number>();
  });
});
