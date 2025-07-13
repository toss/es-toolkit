import { describe, expect, expectTypeOf, it } from 'vitest';
import { identity } from 'es-toolkit/compat';
import type { identity as identityLodash } from 'lodash';

describe('identity', () => {
  it('should return the input value unchanged for a number', () => {
    expect(identity(5)).toBe(5);
  });

  it('should return the input value unchanged for a string', () => {
    expect(identity('hello')).toBe('hello');
  });

  it('should return the input value unchanged for an object', () => {
    const obj = { key: 'value' };
    expect(identity(obj)).toBe(obj);
  });

  it('should return the input value unchanged for an array', () => {
    const arr = [1, 2, 3];
    expect(identity(arr)).toBe(arr);
  });

  it('should return the input value unchanged for a boolean', () => {
    expect(identity(true)).toBe(true);
    expect(identity(false)).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(identity).toEqualTypeOf<typeof identityLodash>();
  });
});
