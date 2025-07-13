import { describe, expect, expectTypeOf, it } from 'vitest';
import { eq } from 'es-toolkit/compat';
import type { eq as eqLodash } from 'lodash';

describe('eq', () => {
  it('should perform a `SameValueZero` comparison of two values', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(eq()).toBe(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(eq(undefined)).toBe(true);
    expect(eq(0, -0)).toBe(true);
    expect(eq(NaN, NaN)).toBe(true);
    expect(eq(1, 1)).toBe(true);

    expect(eq(null, undefined)).toBe(false);
    expect(eq(1, Object(1))).toBe(false);
    expect(eq(1, '1')).toBe(false);
    expect(eq(1, '1')).toBe(false);

    const object = { a: 1 };
    expect(eq(object, object)).toBe(true);
    expect(eq(object, { a: 1 })).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(eq).toEqualTypeOf<typeof eqLodash>();
  });
});
