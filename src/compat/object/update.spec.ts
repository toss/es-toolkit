import { describe, expect, expectTypeOf, it } from 'vitest';
import { each, map, toString, unset, update } from '..';
import type { update as updateLodash } from 'lodash';
import { symbol } from '../_internal/symbol';
import { constant } from '../util/constant';

describe('update', () => {
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

  it('should match the type of lodash', () => {
    expectTypeOf(update).toEqualTypeOf<typeof updateLodash>();
  });
});
