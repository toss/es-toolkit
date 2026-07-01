import { describe, expectTypeOf, it } from 'vitest';
import type { Merge } from './Merge';

describe('Merge', () => {
  it('combines two object types', () => {
    type A = { id: number };
    type B = { name: string };
    expectTypeOf<Merge<A, B>>().toEqualTypeOf<{ id: number; name: string }>();
  });

  it('overrides overlapping keys with the second type', () => {
    type Base = { id: number; createdAt: string };
    type Override = { createdAt: Date };
    expectTypeOf<Merge<Base, Override>>().toEqualTypeOf<{ id: number; createdAt: Date }>();
  });
});
