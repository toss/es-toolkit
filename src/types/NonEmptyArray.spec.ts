import { describe, expectTypeOf, it } from 'vitest';
import type { NonEmptyArray } from './NonEmptyArray';

describe('NonEmptyArray', () => {
  it('guarantees at least one element', () => {
    const ok: NonEmptyArray<number> = [1];
    expectTypeOf(ok).toEqualTypeOf<NonEmptyArray<number>>();

    type EmptyAssignable = [] extends NonEmptyArray<number> ? true : false;
    expectTypeOf<EmptyAssignable>().toEqualTypeOf<false>();
  });

  it('resolves the first element to T, not T | undefined', () => {
    expectTypeOf<NonEmptyArray<string>[0]>().toEqualTypeOf<string>();
  });
});
