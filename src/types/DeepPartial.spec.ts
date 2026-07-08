import { describe, expectTypeOf, it } from 'vitest';
import type { DeepPartial } from './DeepPartial';

describe('DeepPartial', () => {
  it('makes nested object properties optional recursively', () => {
    type Config = { server: { host: string; port: number }; debug: boolean };
    expectTypeOf<DeepPartial<Config>>().toEqualTypeOf<{
      server?: { host?: string; port?: number };
      debug?: boolean;
    }>();
  });

  it('recurses into array elements without making them sparse', () => {
    type T = { users: Array<{ name: string; age: number }> };
    expectTypeOf<DeepPartial<T>>().toEqualTypeOf<{ users?: Array<{ name?: string; age?: number }> }>();
  });

  it('preserves tuple shape and arity', () => {
    type T = { pair: [number, { x: string }] };
    expectTypeOf<DeepPartial<T>>().toEqualTypeOf<{ pair?: [number, { x?: string }] }>();
  });

  it('keeps functions, Date, and RegExp unchanged', () => {
    expectTypeOf<DeepPartial<() => void>>().toEqualTypeOf<() => void>();
    expectTypeOf<DeepPartial<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<DeepPartial<RegExp>>().toEqualTypeOf<RegExp>();
  });

  it('recurses into Map and Set contents', () => {
    expectTypeOf<DeepPartial<Map<string, { a: number; b: string }>>>().toEqualTypeOf<
      Map<string, { a?: number; b?: string }>
    >();
    expectTypeOf<DeepPartial<Set<{ a: number }>>>().toEqualTypeOf<Set<{ a?: number }>>();
  });

  it('makes Record values partial', () => {
    type T = Record<string, { a: number; b: string }>;
    expectTypeOf<DeepPartial<T>>().toEqualTypeOf<Partial<Record<string, { a?: number; b?: string }>>>();
  });
});
