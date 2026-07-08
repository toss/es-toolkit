import { describe, expectTypeOf, it } from 'vitest';
import type { SetOptional } from './SetOptional';

describe('SetOptional', () => {
  it('makes only the given keys optional', () => {
    type User = { id: number; name: string; avatar: string };
    expectTypeOf<SetOptional<User, 'avatar'>>().toEqualTypeOf<{ id: number; name: string; avatar?: string }>();
  });

  it('rejects keys that do not exist on T', () => {
    type User = { id: number; name: string };
    // @ts-expect-error keys must exist on T
    expectTypeOf<SetOptional<User, 'nickname'>>().toBeObject();
  });
});
