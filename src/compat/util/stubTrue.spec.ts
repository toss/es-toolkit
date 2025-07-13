import { describe, expect, expectTypeOf, it } from 'vitest';
import { stubTrue } from 'es-toolkit/compat';
import type { stubTrue as stubTrueLodash } from 'lodash';

describe('stubTrue', () => {
  it('should return `true`', () => {
    expect(stubTrue()).toEqual(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubTrue).toEqualTypeOf<typeof stubTrueLodash>();
  });
});
