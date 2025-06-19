import { describe, expect, it, expectTypeOf } from 'vitest';
import type { stubString as stubStringLodash } from 'lodash';
import { stubString } from './stubString';

describe('stubString', () => {
  it('should return an empty string', () => {
    expect(stubString()).toEqual('');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(stubString).toEqualTypeOf<typeof stubStringLodash>();
  });
});
