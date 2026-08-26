import { describe, expectTypeOf, it } from 'vitest';
import type { IsEqual } from './IsEqual';

describe('IsEqual', () => {
  it('resolves to true only when both types are identical', () => {
    expectTypeOf<IsEqual<{ a: string }, { a: string }>>().toEqualTypeOf<true>();
    expectTypeOf<IsEqual<string, 'literal'>>().toEqualTypeOf<false>();
  });

  it('tells any apart from other types', () => {
    expectTypeOf<IsEqual<unknown, any>>().toEqualTypeOf<false>();
    expectTypeOf<IsEqual<any, any>>().toEqualTypeOf<true>();
  });
});
