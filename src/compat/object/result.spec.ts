import { describe, expect, expectTypeOf, it } from 'vitest';
import { result } from 'es-toolkit/compat';
import { forEach } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { constant } from 'es-toolkit/compat';
import { noop } from 'es-toolkit/compat';
import type { result as resultLodash } from 'lodash';
import { empties } from '../_internal/empties';
import { numberProto } from '../_internal/numberProto';
import { stubB } from '../_internal/stubB';
import { symbol } from '../_internal/symbol';

describe('result', () => {
  const object = { a: 1, b: stubB };

  it('should invoke function values', () => {
    expect(result(object, 'b')).toBe('b');
  });

  it('should invoke default function values', () => {
    const actual = result(object, 'c', object.b);
    expect(actual).toBe('b');
  });

  it('should invoke nested function values', () => {
    const value = { a: constant({ b: stubB }) };

    forEach(['a.b', ['a', 'b']], path => {
      expect(result(value, path)).toBe('b');
    });
  });

  it('should invoke deep property methods with the correct `this` binding', () => {
    const value = {
      a: {
        b: function () {
          return this.c;
        },
        c: 1,
      },
    };

    forEach(['a.b', ['a', 'b']], path => {
      expect(result(value, path)).toBe(1);
    });
  });

  it(`should get string keyed property values`, () => {
    const object = { a: 1 };

    forEach(['a', ['a']], path => {
      expect(result(object, path)).toBe(1);
    });
  });

  it(`should preserve the sign of \`0\``, () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];

    const actual = map(props, key => result(object, key));

    expect(actual).toEqual(['a', 'a', 'b', 'b']);
  });

  it(`should get symbol keyed property values`, () => {
    const object: Record<PropertyKey, unknown> = {};
    object[symbol] = 1;

    expect(result(object, symbol)).toBe(1);
  });

  it(`should get deep property values`, () => {
    const object = { a: { b: 2 } };

    forEach(['a.b', ['a', 'b']], path => {
      expect(result(object, path)).toBe(2);
    });
  });

  it(`should get a key over a path`, () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    forEach(['a.b', ['a.b']], path => {
      expect(result(object, path)).toBe(1);
    });
  });

  it(`should not coerce array paths to strings`, () => {
    const object = { 'a,b,c': 3, a: { b: { c: 4 } } };
    expect(result(object, ['a', 'b', 'c'])).toBe(4);
  });

  it(`should not ignore empty brackets`, () => {
    const object = { a: { '': 1 } };
    expect(result(object, 'a[]')).toBe(1);
  });

  it(`should handle empty paths`, () => {
    forEach(
      [
        ['', ''],
        [[], ['']],
      ],
      pair => {
        expect(result({}, pair[0])).toBe(undefined);
        expect(result({ '': 3 }, pair[1])).toBe(3);
      }
    );
  });

  it(`should handle complex paths`, () => {
    const object = {
      a: { '-1.23': { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: 8 } } } } } } },
    };

    const paths = [
      'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
      ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'],
    ];

    forEach(paths, path => {
      expect(result(object, path)).toBe(8);
    });
  });

  it(`should return \`undefined\` when \`object\` is nullish`, () => {
    forEach(['constructor', ['constructor']], path => {
      expect(result(null, path)).toBe(undefined);
      expect(result(undefined, path)).toBe(undefined);
    });
  });

  it(`should return \`undefined\` for deep paths when \`object\` is nullish`, () => {
    const values = [null, undefined];
    const expected = map(values, noop);
    const paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

    forEach(paths, path => {
      const actual = map(values, value => result(value, path));

      expect(actual).toEqual(expected);
    });
  });

  it(`should return \`undefined\` if parts of \`path\` are missing`, () => {
    // eslint-disable-next-line no-sparse-arrays
    const object = { a: [, null] };

    forEach(['a[1].b.c', ['a', '1', 'b', 'c']], path => {
      expect(result(object, path)).toBe(undefined);
    });
  });

  it(`should be able to return \`null\` values`, () => {
    const object = { a: { b: null } };

    forEach(['a.b', ['a', 'b']], path => {
      expect(result(object, path)).toBe(null);
    });
  });

  it(`should follow \`path\` over non-plain objects`, () => {
    const paths = ['a.b', ['a', 'b']];

    forEach(paths, path => {
      numberProto.a = { b: 2 };
      expect(result(0, path)).toBe(2);
      delete numberProto.a;
    });
  });

  it(`should return the default value for \`undefined\` values`, () => {
    const object = { a: {} };
    const values = empties.concat(true, new Date(), 1, /x/, 'a');
    const expected = map(values, value => [value, value]);

    forEach(['a.b', ['a', 'b']], path => {
      const actual = map(values, value => [result(object, path, value), result(null, path, value)]);

      expect(actual).toEqual(expected);
    });
  });

  it(`should return the default value when \`path\` is empty`, () => {
    expect(result({}, [], 'a')).toBe('a');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(result).toEqualTypeOf<typeof resultLodash>();
  });
});
