import { describe, expectTypeOf, it } from 'vitest';
import type { UnknownRecord } from './UnknownRecord';

describe('UnknownRecord', () => {
  it('accepts objects but rejects the primitives that `{}` lets through', () => {
    expectTypeOf<Record<string, unknown>>().toExtend<UnknownRecord>();
    expectTypeOf<number>().not.toExtend<UnknownRecord>();
    expectTypeOf<string>().not.toExtend<UnknownRecord>();
  });
});
