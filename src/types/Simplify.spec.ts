import { describe, expectTypeOf, it } from 'vitest';
import type { Simplify } from './Simplify';

describe('Simplify', () => {
  it('flattens an intersection into a single object type', () => {
    type A = { name: string };
    type B = { age: number };
    expectTypeOf<Simplify<A & B>>().toEqualTypeOf<{ name: string; age: number }>();
  });

  it('preserves optional and readonly modifiers', () => {
    type T = { readonly id: number; name?: string };
    expectTypeOf<Simplify<T>>().toEqualTypeOf<{ readonly id: number; name?: string }>();
  });
});
