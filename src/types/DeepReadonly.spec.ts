import { describe, expectTypeOf, it } from 'vitest';
import type { DeepReadonly } from './DeepReadonly';

describe('DeepReadonly', () => {
  it('makes nested object properties readonly recursively', () => {
    type State = { user: { name: string; active: boolean } };
    expectTypeOf<DeepReadonly<State>>().toEqualTypeOf<{
      readonly user: { readonly name: string; readonly active: boolean };
    }>();
  });

  it('rejects mutation at any depth', () => {
    type State = { user: { name: string } };
    const state = { user: { name: 'kim' } } as DeepReadonly<State>;

    // @ts-expect-error nested properties are readonly
    state.user.name = 'lee';
    expectTypeOf(state).toEqualTypeOf<DeepReadonly<State>>();
  });

  it('makes arrays readonly and recurses into elements', () => {
    type T = { users: Array<{ name: string }> };
    expectTypeOf<DeepReadonly<T>>().toEqualTypeOf<{
      readonly users: ReadonlyArray<{ readonly name: string }>;
    }>();
  });

  it('preserves tuple shape', () => {
    type T = { pair: [number, { x: string }] };
    expectTypeOf<DeepReadonly<T>>().toEqualTypeOf<{
      readonly pair: readonly [number, { readonly x: string }];
    }>();
  });

  it('keeps functions, Date, and RegExp unchanged', () => {
    expectTypeOf<DeepReadonly<() => void>>().toEqualTypeOf<() => void>();
    expectTypeOf<DeepReadonly<Date>>().toEqualTypeOf<Date>();
    expectTypeOf<DeepReadonly<RegExp>>().toEqualTypeOf<RegExp>();
  });

  it('makes Record values readonly', () => {
    type T = Record<string, { a: number }>;
    expectTypeOf<DeepReadonly<T>>().toEqualTypeOf<Readonly<Record<string, { readonly a: number }>>>();
  });
});
