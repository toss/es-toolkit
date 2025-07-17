import { describe, expect, expectTypeOf, it } from 'vitest';
import type { get as getLodash } from 'lodash';
import { get } from './get';
import { empties } from '../_internal/empties';

describe('get', () => {
  it('should return defaultVersion', () => {
    const obj = { a: { b: 3 } };
    expect(get(obj, 'a.c', null)).toBe(null);
    expect(get(obj, 'a.d', 4)).toBe(4);
    expect(get(obj, 'a.e', undefined)).toBe(undefined);
    expect(get(obj, 0, 5)).toBe(5);
    expect(get(obj, Symbol('a'), 3)).toBe(3);
  });

  it('should return value', () => {
    const obj = { a: { b: 3 } };
    expect(get(obj, 'a.b')).toBe(3);
  });

  it('should return value with array', () => {
    const obj = { a: [{ b: 3 }] };
    expect(get(obj, 'a[0].b')).toBe(3);
  });

  it('should return undefined if array index number is not provided', () => {
    const obj = { a: [{ b: 1 }] };
    expect(get(obj, 'a[].b')).toBe(undefined);
  });

  /**
   * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/get-and-result.spec.js#L1
   */
  it(`should get string keyed property values`, () => {
    const object = { a: 1 };

    expect(get(object, 'a')).toBe(1);
    expect(get(object, ['a'])).toBe(1);
  });

  it(`should preserve the sign of \`0\``, () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];

    const actual = props.map(key => get(object, key));

    expect(actual).toEqual(['a', 'a', 'b', 'b']);
  });

  it(`should get symbol keyed property values`, () => {
    const symbol = Symbol('a');
    const object: any = {};
    object[symbol] = 1;

    expect(get(object, symbol)).toBe(1);
  });

  it(`should get deep property values`, () => {
    const object = { a: { b: 2 } };

    expect(get(object, 'a.b')).toBe(2);
    expect(get(object, ['a', 'b'])).toBe(2);
  });

  it(`should get a key over a path`, () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    expect(get(object, 'a.b')).toBe(1);
    expect(get(object, ['a.b'])).toBe(1);
  });

  it(`should not coerce array paths to strings`, () => {
    const object = { 'a,b,c': 3, a: { b: { c: 4 } } };
    expect(get(object, ['a', 'b', 'c'])).toBe(4);
  });

  it(`should not ignore empty brackets`, () => {
    const object = { a: { '': 1 } };
    expect(get(object, 'a[]')).toBe(1);
  });

  it(`should handle empty paths`, () => {
    expect(get({}, '')).toBe(undefined);
    expect(get({ '': 3 }, '')).toBe(3);

    expect(get({}, [''])).toBe(undefined);
    expect(get({ '': 3 }, [''])).toBe(3);
  });

  it(`should handle complex paths`, () => {
    const object = {
      a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 8 } } } } } } },
    };

    expect(get(object, 'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g')).toBe(8);
    expect(get(object, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'])).toBe(8);
  });

  it(`should return \`undefined\` when \`object\` is nullish`, () => {
    expect(get(null, 'constructor')).toBe(undefined);
    expect(get(null, ['constructor'])).toBe(undefined);
  });

  it(`should return \`undefined\` for deep paths when \`object\` is nullish`, () => {
    expect(get(null, 'constructor.prototype.valueOf')).toEqual(undefined);
    expect(get(null, ['constructor', 'prototype', 'valueOf'])).toEqual(undefined);
  });

  it(`should return \`undefined\` if parts of \`path\` are missing`, () => {
    // eslint-disable-next-line no-sparse-arrays
    const object = { a: [, null] };

    expect(get(object, 'a[1].b.c')).toEqual(undefined);
    expect(get(object, ['a', '1', 'b', 'c'])).toEqual(undefined);
  });

  it(`should be able to return \`null\` values`, () => {
    const object = { a: { b: null } };

    expect(get(object, 'a.b')).toEqual(null);
    expect(get(object, ['a', 'b'])).toEqual(null);
  });

  it(`should follow \`path\` over non-plain objects`, () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Number.prototype.a = { b: 2 };

    expect(get(0, 'a.b')).toEqual(2);
    expect(get(0, ['a', 'b'])).toEqual(2);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete Number.prototype.a;
  });

  it(`should return the default value for \`undefined\` values`, () => {
    const object = { a: {} };
    const values = empties.concat(true, new Date(), 1, /x/, 'a');
    const expected = values.map(value => [value, value]);

    ['a.b', ['a', 'b']].forEach(path => {
      const actual = values.map(value => [get(object, path, value), get(null, path, value)]);

      expect(actual).toEqual(expected);
    });
  });

  it(`should return the default value when \`path\` is empty`, () => {
    expect(get({}, [], 'a')).toBe('a');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(get<unknown>).toEqualTypeOf<typeof getLodash<unknown>>();
  });
});
