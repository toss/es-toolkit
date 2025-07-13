import { describe, expect, expectTypeOf, it } from 'vitest';
import { stubFalse } from 'es-toolkit/compat';
import type { stubFalse as stubFalseLodash } from 'lodash';

describe('stubFalse', () => {
  it('should return `false`', () => {
    expect(stubFalse()).toEqual(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubFalse).toEqualTypeOf<typeof stubFalseLodash>();
  });
});
