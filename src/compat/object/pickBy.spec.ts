import { describe, expect, it, expectTypeOf } from 'vitest';
import type { pickBy as pickByLodash } from 'lodash';
import * as lodashStable from 'es-toolkit/compat';
import { pickBy } from './pickBy';
import { symbol } from '../_internal/symbol';
import { stubTrue } from '../util/stubTrue';

describe('pickBy', () => {
  const object = { a: 1, b: 2, c: 3, d: 4 };
  const expected = { a: 1, c: 3 };
  const resolve = function (object: any, props: any) {
    props = lodashStable.castArray(props);
    return function (value: any) {
      return lodashStable.some(props, key => {
        key = lodashStable.isSymbol(key) ? key : lodashStable.toString(key);
        return object[key] === value;
      });
    };
  };

  it(`\`pickBy\` should create an object of picked string keyed properties`, () => {
    expect(pickBy(object, resolve(object, 'a'))).toEqual({ a: 1 });
    expect(pickBy(object, resolve(object, ['a', 'c']))).toEqual(expected);
  });

  it(`\`pickBy\` should pick inherited string keyed properties`, () => {
    function Foo() {}
    Foo.prototype = object;

    // @ts-expect-error - Foo is a constructor
    const foo = new Foo();
    expect(pickBy(foo, resolve(foo, ['a', 'c']))).toEqual(expected);
  });

  it(`\`pickBy\` should preserve the sign of \`0\``, () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = [{ '-0': 'a' }, { '-0': 'a' }, { 0: 'b' }, { 0: 'b' }];

    const actual = lodashStable.map(props, key => pickBy(object, resolve(object, key)));

    expect(actual).toEqual(expected);
  });

  it(`\`pickBy\` should pick symbols`, () => {
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
      const actual = pickBy(foo, resolve(foo, [symbol, symbol2, symbol3]));

      expect(actual[symbol as any]).toBe(1);
      expect(actual[symbol2 as any]).toBe(2);

      expect(symbol3 in actual).toBe(false);
    }
  });

  it(`\`pickBy\` should work with an array \`object\``, () => {
    const array = [1, 2, 3];
    expect(pickBy(array, resolve(array, '1'))).toEqual({ 1: 2 });
  });

  it('should work with a predicate argument', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };

    const actual = pickBy(object, n => n === 1 || n === 3);

    expect(actual).toEqual({ a: 1, c: 3 });
  });

  it('should not treat keys with dots as deep paths', () => {
    const object = { 'a.b.c': 1 };
    const actual = pickBy(object, stubTrue);

    expect(actual).toEqual({ 'a.b.c': 1 });
  });

  it('should pick properties based on the predicate function', () => {
    const obj = { a: 1, b: 'pick', c: 3 };
    const shouldPick = (value: string | number) => typeof value === 'string';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: 'pick' });
  });

  it('should return an empty object if no properties satisfy the predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldPick = (value: number) => typeof value === 'string';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it('should return the same object if all properties satisfy the predicate', () => {
    const obj = { a: 'pick', b: 'pick', c: 'pick' };
    const shouldPick = (value: string) => typeof value === 'string';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual(obj);
  });

  it('should work with an empty object', () => {
    const obj = {};
    const shouldPick = (value: never) => value;
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it('should work with nested objects', () => {
    const obj = { a: 1, b: { nested: 'pick' }, c: 3 };
    const shouldPick = (value: number | { nested: string }, key: string) => key === 'b';
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: { nested: 'pick' } });
  });

  it('should work with no predicate function', () => {
    const obj = { a: 1, b: 'pick', c: 3 };
    const result = pickBy(obj);
    expect(result).toEqual(obj);
  });

  it('should return an empty object if the object is null', () => {
    const obj = null;
    const shouldPick = (value: string) => typeof value === 'string';
    const result = pickBy(obj as unknown as object, shouldPick);
    expect(result).toEqual({});
  });

  it('should return an empty object if the object is undefined', () => {
    const obj = undefined;
    const shouldPick = (value: string) => typeof value === 'string';
    const result = pickBy(obj as unknown as object, shouldPick);
    expect(result).toEqual({});
  });

  it(`should provide correct iteratee arguments`, () => {
    const array = [1, 2, 3];

    let args: any;
    const expected: any = [1, 0, array];

    // eslint-disable-next-line
    // @ts-ignore
    pickBy(array, function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    // eslint-disable-next-line
    expected[1] += '';

    expect(args).toEqual(expected);
  });

  it(`should treat sparse arrays as dense`, () => {
    const array = [1];
    array[2] = 3;

    let expected = [
      [1, '0', array],
      [undefined, '1', array],
      [3, '2', array],
    ];

    expected = lodashStable.map(expected, args => {
      // eslint-disable-next-line
      args[1] += '';
      return args;
    });

    const argsList: any = [];
    pickBy(array, function () {
      // eslint-disable-next-line
      argsList.push(Array.prototype.slice.call(arguments));
      return true;
    });

    expect(argsList).toEqual(expected);
  });

  it(`should ignore changes to \`length\``, () => {
    let count = 0;
    const array = [1];

    pickBy(array, () => {
      if (++count === 1) {
        array.push(2);
      }
      return true;
    });

    expect(count).toBe(1);
  });

  it(`should ignore added \`object\` properties`, () => {
    let count = 0;
    const object = { a: 1 };

    pickBy(object, () => {
      if (++count === 1) {
        // eslint-disable-next-line
        // @ts-ignore
        object.b = 2;
      }
      return true;
    });

    expect(count).toBe(1);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(pickBy).toEqualTypeOf<typeof pickByLodash>();
  });
});
