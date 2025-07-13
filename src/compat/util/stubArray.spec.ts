import { describe, expect, expectTypeOf, it } from 'vitest';
import { stubArray } from 'es-toolkit/compat';
import type { stubArray as stubArrayLodash } from 'lodash';

describe('stubArray', () => {
  it('should return an empty array', () => {
    expect(stubArray()).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubArray).toEqualTypeOf<typeof stubArrayLodash>();
  });
});
