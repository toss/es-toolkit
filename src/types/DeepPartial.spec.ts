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

  it('accepts a partial patch but still rejects wrong value types', () => {
    type Config = { server: { host: string; port: number } };
    const ok: DeepPartial<Config> = { server: { port: 8080 } };
    expectTypeOf(ok).toEqualTypeOf<DeepPartial<Config>>();

    // optionality must not weaken value types
    // @ts-expect-error port must still be a number
    const bad: DeepPartial<Config> = { server: { port: '8080' } };
    expectTypeOf(bad).toEqualTypeOf<DeepPartial<Config>>();
  });

  it('recurses into array elements without making them sparse', () => {
    type T = { users: Array<{ name: string; age: number }> };
    expectTypeOf<DeepPartial<T>>().toEqualTypeOf<{ users?: Array<{ name?: string; age?: number }> }>();

    // incomplete elements are allowed, holes are not
    const ok: DeepPartial<T> = { users: [{ name: 'kim' }] };
    expectTypeOf(ok).toEqualTypeOf<DeepPartial<T>>();

    // @ts-expect-error sparse arrays stay illegal
    const bad: DeepPartial<T> = { users: [undefined] };
    expectTypeOf(bad).toEqualTypeOf<DeepPartial<T>>();
  });

  it('preserves tuple shape and arity', () => {
    type T = { pair: [number, { x: string }] };
    expectTypeOf<DeepPartial<T>>().toEqualTypeOf<{ pair?: [number, { x?: string }] }>();

    // @ts-expect-error tuple elements do not become optional
    const bad: DeepPartial<T> = { pair: [1] };
    expectTypeOf(bad).toEqualTypeOf<DeepPartial<T>>();
  });

  it('keeps functions, Date, and RegExp unchanged', () => {
    expectTypeOf<DeepPartial<() => void>>().toEqualTypeOf<() => void>();
    expectTypeOf<DeepPartial<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<DeepPartial<RegExp>>().toEqualTypeOf<RegExp>();
  });

  it('recurses into Map and Set', () => {
    expectTypeOf<DeepPartial<Map<string, { a: number }>>>().toEqualTypeOf<Map<string, { a?: number }>>();
    expectTypeOf<DeepPartial<Set<{ a: number }>>>().toEqualTypeOf<Set<{ a?: number }>>();
  });

  it('makes Record values partial', () => {
    type T = Record<string, { a: number; b: string }>;
    expectTypeOf<DeepPartial<T>>().toEqualTypeOf<Partial<Record<string, { a?: number; b?: string }>>>();
  });
});
