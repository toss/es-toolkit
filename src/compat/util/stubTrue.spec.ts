import { describe, expect, expectTypeOf, it } from 'vitest';
import type { stubTrue as stubTrueLodash } from 'lodash';
import { stubTrue } from './stubTrue';

describe('stubTrue', () => {
  it('should return `true`', () => {
    expect(stubTrue()).toEqual(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubTrue).toEqualTypeOf<typeof stubTrueLodash>();
  });
});
