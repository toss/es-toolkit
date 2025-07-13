import { describe, expect, expectTypeOf, it } from 'vitest';
import { defaultTo } from 'es-toolkit/compat';
import type { defaultTo as defaultToLodash } from 'lodash';
import { falsey } from '../_internal/falsey';

describe('defaultTo', () => {
  it('should return a default value if `value` is `NaN` or nullish', () => {
    const expected = falsey.map(value => (value == null || value !== value ? 1 : value));

    const actual = falsey.map(value => defaultTo(value, 1));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(defaultTo).toEqualTypeOf<typeof defaultToLodash>();
  });
});
