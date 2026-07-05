import { describe, expectTypeOf, it } from 'vitest';
import type { Merge } from './Merge';

describe('Merge', () => {
  it('merges two object types, with the second overriding overlapping keys', () => {
    type Base = { id: number; createdAt: string };
    type Override = { createdAt: Date; extra: boolean };
    expectTypeOf<Merge<Base, Override>>().toEqualTypeOf<{ id: number; createdAt: Date; extra: boolean }>();
  });
});
