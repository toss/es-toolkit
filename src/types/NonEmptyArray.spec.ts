import { describe, expectTypeOf, it } from 'vitest';
import type { NonEmptyArray } from './NonEmptyArray';

describe('NonEmptyArray', () => {
  it('is a tuple with a required first element and a rest', () => {
    expectTypeOf<NonEmptyArray<number>>().toEqualTypeOf<[number, ...number[]]>();
  });

  it('resolves the first element to T, not T | undefined', () => {
    expectTypeOf<NonEmptyArray<string>[0]>().toEqualTypeOf<string>();
  });

  it('does not accept an empty array', () => {
    type IsEmptyAssignable = [] extends NonEmptyArray<number> ? true : false;
    expectTypeOf<IsEmptyAssignable>().toEqualTypeOf<false>();
  });
});
