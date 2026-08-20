import { describe, expectTypeOf, it } from 'vitest';
import type { JsonValue } from './JsonValue';

describe('JsonValue', () => {
  it('accepts values that survive a JSON round trip', () => {
    expectTypeOf<{ a: string; b: number[]; c: { d: boolean | null } }>().toExtend<JsonValue>();
  });

  it('rejects values that JSON.parse cannot produce', () => {
    expectTypeOf<{ run: () => void }>().not.toExtend<JsonValue>();
    expectTypeOf<{ at: Date }>().not.toExtend<JsonValue>();
    expectTypeOf<{ maybe: undefined }>().not.toExtend<JsonValue>();
  });
});
