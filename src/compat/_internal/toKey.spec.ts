import { describe, expect, it, expectTypeOf } from 'vitest';
import type { toKey as toKeyLodash } from 'lodash';
import { toKey } from './toKey';

describe('toKey', () => {
  it("converts 0 to '0'", () => {
    expect(toKey(0)).toBe('0');
  });

  it("converts -0 to '-0'", () => {
    expect(toKey(-0)).toBe('-0');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(toKey).toEqualTypeOf<typeof toKeyLodash>();
  });
});
