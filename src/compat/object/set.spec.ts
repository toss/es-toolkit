import { describe, expect, expectTypeOf, it } from 'vitest';
import { set } from 'es-toolkit/compat';
import { constant, each, map, toString, unset } from '..';
import type { set as setLodash } from 'lodash';
import { symbol } from '../_internal/symbol';

describe('set', () => {
  const oldValue = 1;
  const value = 2;
  const updater = value;

  // --------------------------------------------------------------------------------
  // object
  //--------------------------------------------------------------------------------
  it('should set a value on an object', () => {
    interface Test {
      a: number;
    }
    const result = set<Test>({} as Test, 'a', 1);
    expect(result).toEqual({ a: 1 });
  });

  it('should set a value on an object with nested path', () => {
    const result = set<{ a: { b: number } }>({} as { a: { b: number } }, 'a.b', 1);
    expect(result).toEqual({ a: { b: 1 } });
  });

  it('should set a value on an object with paths with arrays', () => {
    const result = set<{ a: { b: number } }>({} as { a: { b: number } }, ['a', 'b'], 1);
    expect(result).toEqual({ a: { b: 1 } });
  });

  it('should set a value on an object with nested path', () => {
    const result = set<{ a: { b: { c: { d: number } } } }>({} as { a: { b: { c: { d: number } } } }, 'a.b.c.d', 1);
    expect(result).toEqual({ a: { b: { c: { d: 1 } } } });
  });

  //--------------------------------------------------------------------------------
  // array
  //--------------------------------------------------------------------------------
  it('should set a value on an array', () => {
    const result = set<number[]>([] as number[], 0, 1);
    expect(result).toEqual([1]);
    expect(result[0]).toEqual(1);
  });

  it('should set a value on an array with nested path', () => {
    const result = set<number[][]>([] as number[][], '0.0', 1);
    expect(result).toEqual([[1]]);
    expect(result[0][0]).toEqual(1);
  });

  it('should set a value on an array with nested path', () => {
    const result = set<number[][][]>([], '0.0.0', 1);
    expect(result).toEqual([[[1]]]);
    expect(result[0][0][0]).toEqual(1);
  });
  it('should set a value on an array with nested path', () => {
    const arr = [1, 2, 3];
    set(arr, 1, 4);
    expect(arr).toEqual([1, 4, 3]);
    expect(arr[1]).toEqual(4);
  });

  //--------------------------------------------------------------------------------
  // object and array
  //--------------------------------------------------------------------------------
  it('should set a value on an object and array', () => {
    const result = set<Array<{ a: number }>>([] as Array<{ a: number }>, '0.a', 1);
    expect(result).toEqual([{ a: 1 }]);
    expect(result[0].a).toEqual(1);
  });

  it('should set a value on an object and array', () => {
    const result = set<{ a: number[] }>({} as { a: number[] }, 'a.0', 1);
    expect(result).toEqual({ a: [1] });
    expect(result.a[0]).toEqual(1);
  });

  it('should set a value on an object and array', () => {
    const result = set<{ a: number[][] }>({} as { a: number[][] }, 'a.0.0', 1);
    expect(result).toEqual({ a: [[1]] });
    expect(result.a[0][0]).toEqual(1);
  });

  it('should set a value on an object and array', () => {
    const result = set<{ a: number[][][] }>({} as { a: number[][][] }, 'a[0][0][0]', 1);
    expect(result).toEqual({ a: [[[1]]] });
    expect(result.a[0][0][0]).toEqual(1);
  });

  it(`\`set\` should set property values`, () => {
    each(['a', ['a']], path => {
      const object = { a: oldValue };
      const actual = set(object, path, updater);

      expect(actual).toBe(object);
      expect(object.a).toBe(value);
    });
  });

  it(`\`set\` should preserve the sign of \`0\``, () => {
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = map(props, constant(value));

    const actual = map(props, key => {
      const object: Record<any, any> = { '-0': 'a', 0: 'b' };
      set(object, key, updater);
      return object[toString(key)];
    });

    expect(actual).toEqual(expected);
  });

  it(`\`set\` should unset symbol keyed property values`, () => {
    const object: Record<any, any> = {};
    // @ts-expect-error - symbol type
    object[symbol] = 1;

    expect(unset(object, symbol)).toBe(true);
    expect(symbol in object).toBe(false);
  });

  it(`\`set\` should set deep property values`, () => {
    each(['a.b', ['a', 'b']], path => {
      const object = { a: { b: oldValue } };
      const actual = set(object, path, updater);

      expect(actual).toBe(object);
      expect(object.a.b).toBe(value);
    });
  });

  it(`\`set\` should set a key over a path`, () => {
    each(['a.b', ['a.b']], path => {
      const object = { 'a.b': oldValue };
      const actual = set(object, path, updater);

      expect(actual).toBe(object);
      expect(object).toEqual({ 'a.b': value });
    });
  });

  it(`\`set\` should not coerce array paths to strings`, () => {
    const object = { 'a,b,c': 1, a: { b: { c: 1 } } };

    set(object, ['a', 'b', 'c'], updater);
    expect(object.a.b.c).toBe(value);
  });

  it(`\`set\` should not ignore empty brackets`, () => {
    const object = {};

    set(object, 'a[]', updater);
    expect(object).toEqual({ a: { '': value } });
  });

  it(`\`set\` should handle empty paths`, () => {
    each(
      [
        ['', ''],
        [[], ['']],
      ],
      (pair, index) => {
        const object = {};

        set(object, pair[0], updater);
        expect(object).toEqual(index ? {} : { '': value });

        set(object, pair[1], updater);
        expect(object).toEqual({ '': value });
      }
    );
  });

  it(`\`set\` should handle complex paths`, () => {
    const object: Record<any, any> = {
      a: { 1.23: { '["b"]': { c: { "['d']": { '\ne\n': { f: { g: oldValue } } } } } } },
    };

    const paths = [
      'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
      ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'],
    ];

    each(paths, path => {
      set(object, path, updater);
      expect(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g).toBe(value);
      object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = oldValue;
    });
  });

  it(`\`set\` should create parts of \`path\` that are missing`, () => {
    const object: Record<any, any> = {};

    each(['a[1].b.c', ['a', '1', 'b', 'c']], path => {
      const actual = set(object, path, updater);

      expect(actual).toBe(object);
      expect(actual).toEqual({ a: [undefined, { b: { c: 2 } }] });
      expect('0' in object.a).toBe(false);

      delete object.a;
    });
  });

  it(`\`set\` should not error when \`object\` is nullish`, () => {
    const values = [null, undefined];
    const expected = [
      [null, null],
      [undefined, undefined],
    ];

    const actual = map(values, (value: any) => {
      try {
        return [set(value, 'a.b', updater), set(value, ['a', 'b'], updater)];
      } catch (e: any) {
        return e.message;
      }
    });

    expect(actual).toEqual(expected);
  });

  it(`\`set\` should overwrite primitives in the path`, () => {
    each(['a.b', ['a', 'b']], path => {
      const object = { a: '' };

      set(object, path, updater);
      expect(object).toEqual({ a: { b: 2 } });
    });
  });

  it(`\`set\` should not create an array for missing non-index property names that start with numbers`, () => {
    const object = {};

    set(object, ['1a', '2b', '3c'], updater);
    expect(object).toEqual({ '1a': { '2b': { '3c': value } } });
  });

  it(`\`set\` should not assign values that are the same as their destinations`, () => {
    each(['a', ['a'], { a: 1 }, NaN], value => {
      const object = {};
      let pass = true;
      const updater = value;

      Object.defineProperty(object, 'a', {
        configurable: true,
        enumerable: true,
        get: constant(value),
        set: function () {
          pass = false;
        },
      });

      set(object, 'a', updater);
      expect(pass);
    });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(set).toEqualTypeOf<typeof setLodash>();
  });
});
