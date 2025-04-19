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
});
