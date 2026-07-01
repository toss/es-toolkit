import { describe, expectTypeOf, it } from 'vitest';
import type { SetRequired } from './SetRequired';

describe('SetRequired', () => {
  it('makes the given optional keys required', () => {
    type User = { id: number; name: string; avatar?: string };
    expectTypeOf<SetRequired<User, 'avatar'>>().toEqualTypeOf<{ id: number; name: string; avatar: string }>();
  });

  it('leaves other keys unchanged', () => {
    type User = { id?: number; name?: string };
    expectTypeOf<SetRequired<User, 'id'>>().toEqualTypeOf<{ id: number; name?: string }>();
  });
});
