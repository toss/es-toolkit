import { describe, expectTypeOf, it } from 'vitest';
import type { Writable } from './Writable';

describe('Writable', () => {
  it('removes readonly from all properties', () => {
    type Config = { readonly host: string; readonly port: number };
    expectTypeOf<Writable<Config>>().toEqualTypeOf<{ host: string; port: number }>();
  });
});
