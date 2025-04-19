import { describe, expect, it } from 'vitest';
import { setWith } from './setWith.ts';
import { isObject } from '../predicate/isObject.ts';

describe('setWith', () => {
  it('should work with a `customizer` callback', () => {
    const actual = setWith({ 0: {} }, '[0][1][2]', 3, value => (isObject(value) ? undefined : {}));

    expect(actual).toEqual({ 0: { 1: { 2: 3 } } });
  });

  it('should work with a `customizer` that returns `undefined`', () => {
    const actual = setWith({}, 'a[0].b.c', 4, () => undefined);
    expect(actual).toEqual({ a: [{ b: { c: 4 } }] });
  });

  it('should handle Object as customizer', () => {
    const actual = setWith({}, '[0][1]', 'a', Object);
    expect(actual).toEqual({ 0: { 1: 'a' } });
  });

  it('should return null when object is null', () => {
    expect(setWith(null, 'a.b.c', 1)).toBeNull();
  });

  it('should return undefined when object is undefined', () => {
    expect(setWith(undefined, 'a.b.c', 1)).toBeUndefined();
  });

  it('should work without a customizer', () => {
    const actual = setWith({}, 'a.b.c', 2);
    expect(actual).toEqual({ a: { b: { c: 2 } } });
  });

  it('should handle array paths', () => {
    const actual = setWith({}, ['a', 'b', 'c'], 3);
    expect(actual).toEqual({ a: { b: { c: 3 } } });
  });

  it('should handle number paths', () => {
    const obj: unknown[] = [];
    setWith(obj, 0, 'value');
    expect(obj).toEqual(['value']);
  });
});
