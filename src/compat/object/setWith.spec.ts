import { describe, expect, expectTypeOf, it } from 'vitest';
import { setWith } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';
import { constant, each, map, toString, unset, update } from 'es-toolkit/compat';
import type { setWith as setWithLodash } from 'lodash';
import { symbol } from '../_internal/symbol.ts';

describe('setWith', () => {
  it('should work with a `customizer` callback', () => {
    const actual = setWith({ 0: {} }, '[0][1][2]', 3, value => (isObject(value) ? undefined : {}));

    expect(actual).toEqual({ 0: { 1: { 2: 3 } } });
  });

  it('should work with a `customizer` that returns `undefined`', () => {
    const actual = setWith({}, 'a[0].b.c', 4, () => undefined);
    expect(actual).toEqual({ a: [{ b: { c: 4 } }] });
  });

  const oldValue = 1;
  const value = 2;
  const updater = constant(value);

  it('should set property values', () => {
    each(['a', ['a']], path => {
      const object = { a: oldValue };
      const actual = update(object, path, updater);

      expect(actual).toBe(object);
      expect(object.a).toBe(value);
    });
  });

  it('should preserve the sign of `0`', () => {
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = map(props, constant(value));

    const actual = map(props, key => {
      const object = { '-0': 'a', 0: 'b' };
      update(object, key, updater);
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

  it('should set deep property values', () => {
    each(['a.b', ['a', 'b']], path => {
      const object = { a: { b: oldValue } };
      const actual = update(object, path, updater);

      expect(actual).toBe(object);
      expect(object.a.b).toBe(value);
    });
  });

  it('should set a key over a path', () => {
    each(['a.b', ['a.b']], path => {
      const object = { 'a.b': oldValue };
      const actual = update(object, path, updater);

      expect(actual).toBe(object);
      expect(object).toEqual({ 'a.b': value });
    });
  });

  it('should not coerce array paths to strings', () => {
    const object = { 'a,b,c': 1, a: { b: { c: 1 } } };

    update(object, ['a', 'b', 'c'], updater);
    expect(object.a.b.c).toBe(value);
  });

  it('should not ignore empty brackets', () => {
    const object = {};

    update(object, 'a[]', updater);
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

        update(object, pair[0], updater);
        expect(object).toEqual(index ? {} : { '': value });

        update(object, pair[1], updater);
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
      update(object, path, updater);
      expect(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g).toBe(value);
      object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = oldValue;
    });
  });

  it('should create parts of `path` that are missing', () => {
    const object: any = {};

    each(['a[1].b.c', ['a', '1', 'b', 'c']], path => {
      const actual = update(object, path, updater);

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return [update(value, 'a.b', updater), update(value, ['a', 'b'], updater)];
      } catch (e: unknown) {
        return e instanceof Error ? e.message : 'unknown error';
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should overwrite primitives in the path', () => {
    each(['a.b', ['a', 'b']], path => {
      const object = { a: '' };

      update(object, path, updater);
      expect(object).toEqual({ a: { b: 2 } });
    });
  });

  it('should not create an array for missing non-index property names that start with numbers', () => {
    const object = {};

    update(object, ['1a', '2b', '3c'], updater);
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

      update(object, 'a', updater);
      expect(pass);
    });
  });

  it('should invoke `updater` with the value on `path` of `object`', () => {
    const object = { a: [{ b: { c: oldValue } }] };
    const expected = oldValue + 1;

    each(['a[0].b.c', ['a', '0', 'b', 'c']], path => {
      update(object, path, (n: any) => {
        expect(n).toBe(oldValue);
        return ++n;
      });

      expect(object.a[0].b.c).toBe(expected);
      object.a[0].b.c = oldValue;
    });
  });

  it('should handle Object as customizer', () => {
    const actual = setWith({}, '[0][1]', 'a', Object);
    expect(actual).toEqual({ 0: { 1: 'a' } });
  });

  it('should return null when object is null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(setWith(null, 'a.b.c', 1)).toBeNull();
  });

  it('should return undefined when object is undefined', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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

  it('should match the type of lodash', () => {
    expectTypeOf(setWith).toEqualTypeOf<typeof setWithLodash>();
  });
});
