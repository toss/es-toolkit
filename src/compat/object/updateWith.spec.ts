import { describe, expect, it, expectTypeOf } from 'vitest';
import type { updateWith as updateWithLodash } from 'lodash';
import { each, isObject, map, noop, toString, unset, updateWith } from '..';
import { isKey } from '../_internal/isKey';
import { stubFour } from '../_internal/stubFour';
import { stubThree } from '../_internal/stubThree';
import { symbol } from '../_internal/symbol';
import { constant } from '../util/constant';

describe('updateWith', () => {
  const oldValue = 1;
  const value = 2;
  const updater = constant(value);

  it('should set property values with customizer', () => {
    each(['a', ['a']], path => {
      const object = { a: oldValue };
      const actual = updateWith(object, path, updater, noop);

      expect(actual).toBe(object);
      expect(object.a).toBe(value);
    });
  });

  it('should preserve the sign of `0`', () => {
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = map(props, constant(value));

    const actual = map(props, key => {
      const object = { '-0': 'a', 0: 'b' };
      updateWith(object, key, updater, noop);
      return object[toString(key) as keyof typeof object];
    });

    expect(actual).toEqual(expected);
  });

  it('should unset symbol keyed property values', () => {
    const object: Record<symbol, unknown> = {};
    object[symbol] = 1;

    expect(unset(object, symbol)).toBe(true);
    expect(symbol in object).toBe(false);
  });

  it('should set deep property values with customizer', () => {
    each(['a.b', ['a', 'b']], path => {
      const object = { a: { b: oldValue } };
      const actual = updateWith(object, path, updater, noop);

      expect(actual).toBe(object);
      expect(object.a.b).toBe(value);
    });
  });

  it('should set a key over a path with customizer', () => {
    each(['a.b', ['a.b']], path => {
      const object = { 'a.b': oldValue };
      const actual = updateWith(object, path, updater, noop);

      expect(actual).toBe(object);
      expect(object).toEqual({ 'a.b': value });
    });
  });

  it('should not coerce array paths to strings', () => {
    const object = { 'a,b,c': 1, a: { b: { c: 1 } } };

    updateWith(object, ['a', 'b', 'c'], updater, noop);
    expect(object.a.b.c).toBe(value);
  });

  it('should not ignore empty brackets', () => {
    const object = {};

    updateWith(object, 'a[]', updater, noop);
    expect(object).toEqual({ a: { '': value } });
  });

  it('should handle empty paths', () => {
    each(
      [
        ['', ''],
        [[], ['']],
      ],
      (pair, index) => {
        const object = {};

        updateWith(object, pair[0], updater, noop);
        expect(object).toEqual(index ? {} : { '': value });

        updateWith(object, pair[1], updater, noop);
        expect(object).toEqual({ '': value });
      }
    );
  });

  it('should handle complex paths', () => {
    const object: any = {
      a: { 1.23: { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: oldValue } } } } } } },
    };

    const paths = [
      'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
      ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'],
    ];

    each(paths, path => {
      updateWith(object, path, updater, noop);
      expect(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g).toBe(value);
      object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = oldValue;
    });
  });

  it('should create parts of `path` that are missing', () => {
    const object: any = {};

    each(['a[1].b.c', ['a', '1', 'b', 'c']], path => {
      const actual = updateWith(object, path, updater, noop);

      expect(actual).toBe(object);
      expect(actual).toEqual({ a: [undefined, { b: { c: value } }] });
      expect('0' in object.a).toBe(false);

      delete object.a;
    });
  });

  it('should not error when `object` is nullish', () => {
    const values = [null, undefined];
    const expected = [
      [null, null],
      [undefined, undefined],
    ];

    const actual = map(values, value => {
      try {
        return [updateWith(value, 'a.b', updater, noop), updateWith(value, ['a', 'b'], updater, noop)];
      } catch (e: unknown) {
        return e instanceof Error ? e.message : 'unknown error';
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should overwrite primitives in the path', () => {
    each(['a.b', ['a', 'b']], path => {
      const object = { a: '' };

      updateWith(object, path, updater, noop);
      expect(object).toEqual({ a: { b: 2 } });
    });
  });

  it('should not create an array for missing non-index property names that start with numbers', () => {
    const object = {};

    updateWith(object, ['1a', '2b', '3c'], updater, noop);
    expect(object).toEqual({ '1a': { '2b': { '3c': value } } });
  });

  it('should not assign values that are the same as their destinations', () => {
    each(['a', ['a'], { a: 1 }, NaN], value => {
      const object = {};
      let pass = true;
      const updater = constant(value);

      Object.defineProperty(object, 'a', {
        configurable: true,
        enumerable: true,
        get: constant(value),
        set: function () {
          pass = false;
        },
      });

      updateWith(object, 'a', updater, noop);
      expect(pass);
    });
  });

  it('should invoke `updater` with the value on `path` of `object`', () => {
    const object = { a: [{ b: { c: oldValue } }] };
    const expected = oldValue + 1;

    each(['a[0].b.c', ['a', '0', 'b', 'c']], path => {
      updateWith(
        object,
        path,
        (n: any) => {
          expect(n).toBe(oldValue);
          return ++n;
        },
        noop
      );

      expect(object.a[0].b.c).toBe(expected);
      object.a[0].b.c = oldValue;
    });
  });

  it('should work with a `customizer` callback', () => {
    const actual = updateWith({ 0: {} }, '[0][1][2]', stubThree, value => (isObject(value) ? undefined : {}));

    expect(actual).toEqual({ 0: { 1: { 2: 3 } } });
  });

  it('should work with a `customizer` that returns `undefined`', () => {
    const actual = updateWith({}, 'a[0].b.c', stubFour, noop);
    expect(actual).toEqual({ a: [{ b: { c: 4 } }] });
  });

  it('should handle different path types correctly', () => {
    const object: any = { a: { b: oldValue } };

    updateWith(object, 'a.b', updater, noop);
    expect(object.a.b).toBe(value);
    console.log(isKey('a.b', object));
  });

  it('should match the type of lodash', () => {
    expectTypeOf(updateWith).toEqualTypeOf<typeof updateWithLodash>();
  });
});
