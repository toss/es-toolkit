import { describe, expectTypeOf, it } from 'vitest';
import type { ValueOf } from './ValueOf';

describe('ValueOf', () => {
  it('creates a union of an object type values', () => {
    type User = { id: number; name: string };
    expectTypeOf<ValueOf<User>>().toEqualTypeOf<number | string>();
  });

  it('derives a literal union from a const object', () => {
    type Status = { readonly IDLE: 'idle'; readonly LOADING: 'loading'; readonly ERROR: 'error' };
    expectTypeOf<ValueOf<Status>>().toEqualTypeOf<'idle' | 'loading' | 'error'>();
  });
});
