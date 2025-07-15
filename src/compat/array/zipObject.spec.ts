import { describe, expect, expectTypeOf, it } from 'vitest';
import { each, zipObject } from 'es-toolkit/compat';
import type { zipObject as zipObjectLodash } from 'lodash';

describe('zipObject', () => {
  const object = { barney: 36, fred: 40 };
  it(`should zip together key/value arrays into an object`, () => {
    const actual = zipObject(['barney', 'fred'], [36, 40]);
    expect(actual).toEqual(object);
  });

  it(`should ignore extra \`values\``, () => {
    expect(zipObject(['a'], [1, 2])).toEqual({ a: 1 });
  });

  it(`should assign \`undefined\` values for extra \`keys\``, () => {
    expect(zipObject(['a', 'b'], [1])).toEqual({ a: 1, b: undefined });
  });

  it(`should not support deep paths`, () => {
    each(['a.b.c', ['a', 'b', 'c']], (path, index) => {
      const expected = index ? { 'a,b,c': 1 } : { 'a.b.c': 1 };
      // @ts-expect-error - invalid argument
      expect(zipObject([path], [1])).toEqual(expected);
    });
  });

  it('should return an empty object if no keys are provided', () => {
    expect(zipObject([])).toEqual({});
  });

  it('should return an empty object if no values are provided', () => {
    expect(zipObject(['a', 'b'])).toEqual({});
  });

  it('should return an empty object if no keys and no values are provided', () => {
    expect(zipObject([], [])).toEqual({});
  });

  it('should match the type of lodash', () => {
    expectTypeOf(zipObject).toEqualTypeOf<typeof zipObjectLodash>();
  });
});
