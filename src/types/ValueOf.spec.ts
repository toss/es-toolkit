import { describe, expectTypeOf, it } from 'vitest';
import type { ValueOf } from './ValueOf';

describe('ValueOf', () => {
  it('creates a union of all value types', () => {
    expectTypeOf<ValueOf<{ id: number; name: string }>>().toEqualTypeOf<number | string>();

    type Status = { readonly IDLE: 'idle'; readonly LOADING: 'loading'; readonly ERROR: 'error' };
    expectTypeOf<ValueOf<Status>>().toEqualTypeOf<'idle' | 'loading' | 'error'>();
  });
});
