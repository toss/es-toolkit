import { describe, expectTypeOf, it } from 'vitest';
import type { IsAny } from './IsAny';

describe('IsAny', () => {
  it('resolves to true only for any', () => {
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>();
  });

  it('resolves to false for unknown, never, and ordinary types', () => {
    expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<never>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<string>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<{ a: 1 }>>().toEqualTypeOf<false>();
    expectTypeOf<IsAny<null>>().toEqualTypeOf<false>();
  });
});
