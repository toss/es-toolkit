import { describe, expectTypeOf, it } from 'vitest';
import type { SetRequired } from './SetRequired';

describe('SetRequired', () => {
  it('makes only the given keys required', () => {
    type User = { id?: number; name?: string };
    expectTypeOf<SetRequired<User, 'id'>>().toEqualTypeOf<{ id: number; name?: string }>();
  });
});
