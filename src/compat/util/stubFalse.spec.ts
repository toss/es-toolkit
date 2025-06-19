import { describe, expect, expectTypeOf, it } from 'vitest';
import type { stubFalse as stubFalseLodash } from 'lodash';
import { stubFalse } from './stubFalse';

describe('stubFalse', () => {
  it('should return `false`', () => {
    expect(stubFalse()).toEqual(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubFalse).toEqualTypeOf<typeof stubFalseLodash>();
  });
});
