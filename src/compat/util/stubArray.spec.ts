import { describe, expect, expectTypeOf, it } from 'vitest';
import type { stubArray as stubArrayLodash } from 'lodash';
import { stubArray } from './stubArray';

describe('stubArray', () => {
  it('should return an empty array', () => {
    expect(stubArray()).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubArray).toEqualTypeOf<typeof stubArrayLodash>();
  });
});
