import { describe, expectTypeOf, it } from 'vitest';
import type { Simplify } from './Simplify';

describe('Simplify', () => {
  it('preserves branded primitive types', () => {
    type UserId = string & { readonly __brand: 'UserId' };

    expectTypeOf<Simplify<UserId>>().toEqualTypeOf<UserId>();
  });

  it('flattens an intersection while preserving optional and readonly modifiers', () => {
    type A = { name: string };
    type B = { readonly age?: number };
    expectTypeOf<Simplify<A & B>>().toEqualTypeOf<{ name: string; readonly age?: number }>();
  });
});
