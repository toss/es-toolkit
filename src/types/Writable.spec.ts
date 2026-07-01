import { describe, expectTypeOf, it } from 'vitest';
import type { Writable } from './Writable';

describe('Writable', () => {
  it('removes readonly from all properties', () => {
    type Config = { readonly host: string; readonly port: number };
    expectTypeOf<Writable<Config>>().toEqualTypeOf<{ host: string; port: number }>();
  });

  it('leaves already-writable properties unchanged', () => {
    type T = { a: number; readonly b: string };
    expectTypeOf<Writable<T>>().toEqualTypeOf<{ a: number; b: string }>();
  });
});
