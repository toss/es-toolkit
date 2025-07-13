import { describe, expect, expectTypeOf, it } from 'vitest';
import { toSafeInteger } from 'es-toolkit/compat';
import type { toSafeInteger as toSafeIntegerLodash } from 'lodash';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';

describe('toSafeInteger methods', () => {
  it('should convert values to safe integers', () => {
    expect(toSafeInteger(-5.6)).toBe(-5);
    expect(toSafeInteger('5.6')).toBe(5);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(toSafeInteger()).toBe(0);
    expect(toSafeInteger(NaN)).toBe(0);

    expect(toSafeInteger(Infinity)).toBe(MAX_SAFE_INTEGER);
    expect(toSafeInteger(-Infinity)).toBe(-MAX_SAFE_INTEGER);
  });

  it('should support `value` of `-0`', () => {
    expect(1 / toSafeInteger(-0)).toBe(-Infinity);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(toSafeInteger).toEqualTypeOf<typeof toSafeIntegerLodash>();
  });
});
