import { describe, expectTypeOf, it } from 'vitest';
import type { JSONValue } from './JSONValue';

describe('JSONValue', () => {
  it('accepts values that survive a JSON round trip', () => {
    expectTypeOf<{ a: string; b: number[]; c: { d: boolean | null } }>().toExtend<JSONValue>();
  });

  it('rejects values that JSON.parse cannot produce', () => {
    expectTypeOf<{ run: () => void }>().not.toExtend<JSONValue>();
    expectTypeOf<{ at: Date }>().not.toExtend<JSONValue>();
    expectTypeOf<{ maybe: undefined }>().not.toExtend<JSONValue>();
  });
});
