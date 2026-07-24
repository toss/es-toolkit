import { describe, expectTypeOf, it } from 'vitest';
import type { NonEmptyArray } from './NonEmptyArray';

describe('NonEmptyArray', () => {
  it('guarantees at least one element', () => {
    type SingleAssignable = [number] extends NonEmptyArray<number> ? true : false;
    expectTypeOf<SingleAssignable>().toEqualTypeOf<true>();

    type EmptyAssignable = [] extends NonEmptyArray<number> ? true : false;
    expectTypeOf<EmptyAssignable>().toEqualTypeOf<false>();
  });

  it('resolves the first element to T, not T | undefined', () => {
    expectTypeOf<NonEmptyArray<string>[0]>().toEqualTypeOf<string>();
  });
});
