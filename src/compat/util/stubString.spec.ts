import { describe, expect, expectTypeOf, it } from 'vitest';
import { stubString } from 'es-toolkit/compat';
import type { stubString as stubStringLodash } from 'lodash';

describe('stubString', () => {
  it('should return an empty string', () => {
    expect(stubString()).toEqual('');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubString).toEqualTypeOf<typeof stubStringLodash>();
  });
});
