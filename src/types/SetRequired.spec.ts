import { describe, expectTypeOf, it } from 'vitest';
import type { SetRequired } from './SetRequired';

describe('SetRequired', () => {
  it('makes only the given keys required', () => {
    type User = { id?: number; name?: string };
    expectTypeOf<SetRequired<User, 'id'>>().toEqualTypeOf<{ id: number; name?: string }>();
  });

  it('rejects keys that do not exist on T', () => {
    type User = { id?: number; name?: string };
    // @ts-expect-error keys must exist on T
    expectTypeOf<SetRequired<User, 'nickname'>>().toBeObject();
  });
});
