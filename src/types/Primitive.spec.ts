import { describe, expectTypeOf, it } from 'vitest';
import type { Primitive } from './Primitive';

type IsPrimitive<T> = T extends Primitive ? true : false;

describe('Primitive', () => {
  it('covers every primitive type', () => {
    expectTypeOf<IsPrimitive<string>>().toEqualTypeOf<true>();
    expectTypeOf<IsPrimitive<number>>().toEqualTypeOf<true>();
    expectTypeOf<IsPrimitive<bigint>>().toEqualTypeOf<true>();
    expectTypeOf<IsPrimitive<boolean>>().toEqualTypeOf<true>();
    expectTypeOf<IsPrimitive<symbol>>().toEqualTypeOf<true>();
    expectTypeOf<IsPrimitive<null>>().toEqualTypeOf<true>();
    expectTypeOf<IsPrimitive<undefined>>().toEqualTypeOf<true>();
  });

  it('excludes objects, arrays, and functions', () => {
    expectTypeOf<IsPrimitive<{ a: string }>>().toEqualTypeOf<false>();
    expectTypeOf<IsPrimitive<string[]>>().toEqualTypeOf<false>();
    expectTypeOf<IsPrimitive<() => void>>().toEqualTypeOf<false>();
  });
});
