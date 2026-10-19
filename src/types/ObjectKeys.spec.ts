import { describe, expectTypeOf, it } from 'vitest';
import type { ObjectKeys } from './ObjectKeys';

describe('ObjectKeys', () => {
  it('preserves string literal keys', () => {
    expectTypeOf<ObjectKeys<{ a: number; b: string }>>().toEqualTypeOf<'a' | 'b'>();
  });

  it('converts numeric keys to string literals', () => {
    expectTypeOf<ObjectKeys<{ 1: string; 2: string }>>().toEqualTypeOf<'1' | '2'>();
    expectTypeOf<ObjectKeys<{ a: number; 1: string }>>().toEqualTypeOf<'a' | '1'>();
  });

  it('resolves index signatures to their string forms', () => {
    expectTypeOf<ObjectKeys<Record<string, number>>>().toEqualTypeOf<string>();
    expectTypeOf<ObjectKeys<Record<number, string>>>().toEqualTypeOf<`${number}`>();
  });

  it('excludes symbol keys', () => {
    const sym = Symbol('sym');
    type WithSymbol = { a: number; [sym]: string };
    expectTypeOf<ObjectKeys<WithSymbol>>().toEqualTypeOf<'a'>();
  });
});
