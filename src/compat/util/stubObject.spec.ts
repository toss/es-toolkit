import { describe, expect, expectTypeOf, it } from 'vitest';
import type { stubObject as stubObjectLodash } from 'lodash';
import { stubObject } from './stubObject';

describe('stubObject', () => {
  it('should return an empty object', () => {
    expect(stubObject()).toEqual({});
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubObject).toEqualTypeOf<typeof stubObjectLodash>();
  });
});
