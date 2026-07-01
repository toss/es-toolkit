import { describe, expectTypeOf, it } from 'vitest';
import type { SetOptional } from './SetOptional';

describe('SetOptional', () => {
  it('makes the given keys optional', () => {
    type User = { id: number; name: string; avatar: string };
    expectTypeOf<SetOptional<User, 'avatar'>>().toEqualTypeOf<{ id: number; name: string; avatar?: string }>();
  });

  it('leaves other keys unchanged', () => {
    type User = { id: number; name: string };
    expectTypeOf<SetOptional<User, 'name'>>().toEqualTypeOf<{ id: number; name?: string }>();
  });
});
