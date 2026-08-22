import { describe, expectTypeOf, it } from 'vitest';
import type { EmptyObject } from './EmptyObject';

describe('EmptyObject', () => {
  it('accepts an empty object but rejects one with properties', () => {
    expectTypeOf<Record<string, never>>().toExtend<EmptyObject>();
    expectTypeOf<{ a: number }>().not.toExtend<EmptyObject>();
  });
});
