import { describe, expectTypeOf, it } from 'vitest';
import type { IsUnknown } from './IsUnknown';

describe('IsUnknown', () => {
  it('resolves to true only for unknown', () => {
    expectTypeOf<IsUnknown<unknown>>().toEqualTypeOf<true>();
  });

  it('tells any apart from unknown', () => {
    expectTypeOf<IsUnknown<any>>().toEqualTypeOf<false>();
  });

  it('resolves to false for never and ordinary types', () => {
    expectTypeOf<IsUnknown<never>>().toEqualTypeOf<false>();
    expectTypeOf<IsUnknown<string>>().toEqualTypeOf<false>();
    expectTypeOf<IsUnknown<{ a: 1 }>>().toEqualTypeOf<false>();
    expectTypeOf<IsUnknown<undefined>>().toEqualTypeOf<false>();
  });
});
