import { describe, expect, expectTypeOf, it } from 'vitest';
import { isError } from 'es-toolkit/compat';
import type { isError as isErrorLodash } from 'lodash';

describe('isError', () => {
  it('should return `true` for error objects', () => {
    expect(isError(new Error())).toBe(true);
  });

  it("should return 'true' for subclassed values", () => {
    class CustomError extends Error {}
    expect(isError(new CustomError())).toBe(true);
  });

  it("should return 'false' for non-error objects", () => {
    expect(isError({})).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
    expect(isError('')).toBe(false);
    expect(isError(1)).toBe(false);
    expect(isError(true)).toBe(false);
    expect(isError(Symbol())).toBe(false);
    expect(isError(() => {})).toBe(false);
    expect(isError(new Date())).toBe(false);
    expect(isError(new Map())).toBe(false);
    expect(isError(new Set())).toBe(false);
  });

  it("should return 'false' for plain objects", () => {
    expect(isError({ name: 'Error', message: '' })).toBe(false);
  });

  it('should work with an error object from another realm', () => {
    const realm = { error: new Error() };
    expect(isError(realm.error)).toBe(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isError).toEqualTypeOf<typeof isErrorLodash>();
  });
});
