import { describe, expect, it } from 'vitest';
import { has } from './has';
import { range } from '../../math/range';
import { args } from '../_internal/args';
import { stubFalse } from '../_internal/stubFalse';
import { stubTrue } from '../_internal/stubTrue';
import { symbol } from '../_internal/symbol';
import { toArgs } from '../_internal/toArgs';

describe('has', () => {
  it(`should check for own properties`, () => {
    const object = { a: 1 };

    ['a', ['a']].forEach(path => {
      expect(has(object, path)).toBe(true);
    });
  });

  it(`should not use the \`hasOwnProperty\` method of \`object\``, () => {
    const object = { hasOwnProperty: null, a: 1 };
    expect(has(object, 'a')).toBe(true);
  });

  it(`should support deep paths`, () => {
    const object = { a: { b: 2 } };

    ['a.b', ['a', 'b']].forEach(path => {
      expect(has(object, path)).toBe(true);
    });

    ['a.a', ['a', 'a']].forEach(path => {
      expect(has(object, path)).toBe(false);
    });
  });

  it(`should coerce \`path\` to a string`, () => {
    function fn() {}
    fn.toString = () => 'fn';

    const object = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 };
    const paths: any[] = [null, undefined, fn, {}];
    const expected = paths.map(stubTrue);

    range(2).forEach(index => {
      const actual = paths.map(path => has(object, index ? [path] : path));

      expect(actual).toEqual(expected);
    });
  });

  it(`should work with \`arguments\` objects`, () => {
    expect(has(args, 1)).toBe(true);
  });

  it(`should work with a non-string \`path\``, () => {
    const array = [1, 2, 3];

    [1, [1]].forEach(path => {
      expect(has(array, path)).toBe(true);
    });
  });

  it(`should preserve the sign of \`0\``, () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = props.map(stubTrue);

    const actual = props.map(key => has(object, key));

    expect(actual).toEqual(expected);
  });

  it(`should work with a symbol \`path\``, () => {
    function Foo() {}

    // eslint-disable-next-line
    // @ts-ignore
    Foo.prototype[symbol] = 1;

    const symbol2 = Symbol('b');
    Object.defineProperty(Foo.prototype, symbol2, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: 2,
    });

    const object = Foo.prototype;
    // eslint-disable-next-line
    // @ts-ignore
    expect(has(object, symbol)).toBe(true);
    expect(has(object, symbol2)).toBe(true);
  });

  it(`has should check for a key over a path`, () => {
    const object = { 'a.b': 1 };

    ['a.b', ['a.b']].forEach(path => {
      expect(has(object, path)).toBe(true);
    });
  });

  it(`should return \`true\` for indexes of sparse values`, () => {
    const sparseArgs = toArgs([1]);
    const sparseArray = Array(1);
    const sparseString = Object('a');

    delete sparseArgs[0];

    const values = [sparseArgs, sparseArray, sparseString];

    const expected = values.map(stubTrue);

    const actual = values.map(value => has(value, 0));

    expect(actual).toEqual(expected);
  });

  it(`should return \`true\` for indexes of sparse values with deep paths`, () => {
    const sparseArgs = toArgs([1]);
    const sparseArray = Array(1);
    const sparseString = Object('a');

    delete sparseArgs[0];

    const values = [sparseArgs, sparseArray, sparseString];
    const expected = values.map(() => [true, true]);

    const actual = values.map(value => ['a[0]', ['a', '0']].map(path => has({ a: value }, path)));

    expect(actual).toEqual(expected);
  });

  it(`should return false for inherited properties`, () => {
    function Foo() {}
    Foo.prototype.a = 1;

    ['a', ['a']].forEach(path => {
      // eslint-disable-next-line
      // @ts-ignore
      expect(has(new Foo(), path)).toBe(false);
    });
  });

  it(`should return false for nested inherited properties`, () => {
    function Foo() {}
    Foo.prototype.a = { b: 1 };

    ['a.b', ['a', 'b']].forEach(path => {
      // eslint-disable-next-line
      // @ts-ignore
      expect(has(new Foo(), path)).toBe(false);
    });
  });

  it(`should return \`false\` when \`object\` is nullish`, () => {
    const values = [null, undefined];
    const expected = values.map(stubFalse);

    ['constructor', ['constructor']].forEach(path => {
      const actual = values.map(value => has(value, path));

      expect(actual).toEqual(expected);
    });
  });

  it(`should return \`false\` for deep paths when \`object\` is nullish`, () => {
    const values = [null, undefined];
    const expected = values.map(stubFalse);

    ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']].forEach(path => {
      const actual = values.map(value => has(value, path));

      expect(actual).toEqual(expected);
    });
  });

  it(`should return \`false\` for nullish values of nested objects`, () => {
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = values.map(stubFalse);

    ['a.b', ['a', 'b']].forEach(path => {
      const actual = values.map((value, index) => {
        const object = index ? { a: value } : {};
        return has(object, path);
      });

      expect(actual).toEqual(expected);
    });
  });

  it(`should return \`false\` over sparse values of deep paths`, () => {
    const sparseArgs = toArgs([1]);
    const sparseArray = Array(1);
    const sparseString = Object('a');

    delete sparseArgs[0];

    const values = [sparseArgs, sparseArray, sparseString];
    const expected = values.map(() => [false, false]);

    const actual = values.map(value => ['a[0].b', ['a', '0', 'b']].map(path => has({ a: value }, path)));

    expect(actual).toEqual(expected);
  });
});
