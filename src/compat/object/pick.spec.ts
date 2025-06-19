import { describe, expect, it, expectTypeOf } from 'vitest';
import type { pick as pickLodash } from 'lodash';
import { pick } from './pick';
import { symbol } from '../_internal/symbol';
import { toArgs } from '../_internal/toArgs';
import { map } from '../array/map';
import { nthArg } from '../function/nthArg';

describe('compat/pick', () => {
  const object = { a: 1, b: 2, c: 3, d: 4 };
  const nested = { a: 1, b: { c: 2, d: 3 } };
  const expected = { a: 1, c: 3 };
  const resolve = nthArg(1) as (obj: any, keys: any) => any;

  it(`\`pick\` should create an object of picked string keyed properties`, () => {
    expect(pick(object, resolve(object, 'a'))).toEqual({ a: 1 });
    expect(pick(object, resolve(object, ['a', 'c']))).toEqual(expected);
  });

  it(`\`pick\` should pick inherited string keyed properties`, () => {
    function Foo() {}
    Foo.prototype = object;

    // @ts-expect-error - Foo is a constructor
    const foo = new Foo();
    expect(pick(foo, resolve(foo, ['a', 'c']))).toEqual(expected);
  });

  it(`\`pick\` should preserve the sign of \`0\``, () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = [{ '-0': 'a' }, { '-0': 'a' }, { 0: 'b' }, { 0: 'b' }];

    const actual = map(props, key => pick(object, resolve(object, key)));

    expect(actual).toEqual(expected);
  });

  it(`\`pick\` should pick symbols`, () => {
    function Foo(this: any) {
      this[symbol] = 1;
    }

    if (Symbol) {
      const symbol2 = Symbol('b');
      Foo.prototype[symbol2] = 2;

      const symbol3 = Symbol('c');
      Object.defineProperty(Foo.prototype, symbol3, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: 3,
      });

      // @ts-expect-error - Foo is a constructor
      const foo = new Foo();
      const actual = pick(foo, resolve(foo, [symbol, symbol2, symbol3]));

      expect(actual[symbol]).toBe(1);
      expect(actual[symbol2]).toBe(2);

      expect(actual[symbol3]).toBe(3);
    }
  });

  it(`\`pick\` should work with an array \`object\``, () => {
    const array = [1, 2, 3];
    expect(pick(array, resolve(array, '1'))).toEqual({ 1: 2 });
  });

  it('should flatten `paths`', () => {
    pick(object, 'a', 'b');
    expect(pick(object, 'a', 'c')).toEqual({ a: 1, c: 3 });
    expect(pick(object, ['a', 'd'], 'c')).toEqual({ a: 1, c: 3, d: 4 });
  });

  it('should support deep paths', () => {
    expect(pick(nested, 'b.c')).toEqual({ b: { c: 2 } });
  });

  it('should support path arrays', () => {
    const object = { 'a.b': 1, a: { b: 2 } };
    const actual = pick(object, [['a.b']]);

    expect(actual).toEqual({ 'a.b': 1 });
  });

  it('should pick a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    ['a.b', ['a.b']].forEach(path => {
      expect(pick(object, path)).toEqual({ 'a.b': 1 });
    });

    const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: 3, 'f.g': 4 };
    expect(pick(obj, ['a.b.c', 'f.g'])).toEqual({
      a: { b: { c: 1 } },
      'f.g': 4,
    });
  });

  it('should coerce `paths` to strings', () => {
    expect(pick({ 0: 'a', 1: 'b' }, 0)).toEqual({ 0: 'a' });
  });

  it('should return an empty object when `object` is nullish', () => {
    [null, undefined].forEach(value => {
      expect(pick(value, 'valueOf')).toEqual({});
    });
  });

  it('should work with a primitive `object`', () => {
    expect(pick('', 'slice')).toEqual({ slice: ''.slice });
  });

  it('should work with `arguments` object `paths`', () => {
    const args = toArgs(['a', 'c']);
    // eslint-disable-next-line
    // @ts-ignore
    expect(pick(object, args)).toEqual({ a: 1, c: 3 });
  });

  it('should work with stringified path with array', () => {
    const array: number[] = [];
    array[2] = 3;
    expect(pick({ array: [1, 2, 3] }, 'array[2]')).toEqual({ array });

    const array2: number[] = [];
    array2[1] = 2;
    expect(pick({ array: [1, 2, 3] }, 'array[1]')).toEqual({ array: array2 });
  });

  it('should not pick from nonexistent keys', () => {
    const obj: { a?: unknown; b?: unknown } = {};
    const result = pick(obj, ['a', 'b']);

    expect(Reflect.ownKeys(result)).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(pick).toEqualTypeOf<typeof pickLodash>();
  });
});
