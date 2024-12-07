import { describe, expect, it } from 'vitest';
import { bind } from './bind';
import { curryRight } from './curryRight';
import { partial } from '../../function/partial';
import { partialRight } from '../../function/partialRight';
import { map } from '../array/map';

describe('curryRight', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown, _d: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should curry based on the number of arguments given', () => {
    const curried = curryRight(fn),
      expected = [1, 2, 3, 4];

    expect(curried(4)(3)(2)(1)).toEqual(expected);
    expect(curried(3, 4)(1, 2)).toEqual(expected);
    expect(curried(1, 2, 3, 4)).toEqual(expected);
  });

  it('should allow specifying `arity`', () => {
    const curried = curryRight(fn, 3),
      expected = [1, 2, 3];

    expect(curried(3)(1, 2)).toEqual(expected);
    expect(curried(2, 3)(1)).toEqual(expected);
    expect(curried(1, 2, 3)).toEqual(expected);
  });

  it('should coerce `arity` to an integer', () => {
    const values = ['0', 0.6, 'xyz'],
      expected = values.map(() => []);

    // @ts-expect-error - unusual arity type
    const actual = values.map(arity => curryRight(fn, arity)());

    expect(actual).toEqual(expected);
    // @ts-expect-error - unusual arity type
    expect(curryRight(fn, '2')(1)(2)).toEqual([2, 1]);
  });

  it('should support placeholders', () => {
    const curried = curryRight(fn),
      ph = curried.placeholder;

    expect(curried(4)(2, ph)(1, ph)(3)).toEqual([1, 2, 3, 4]);
    expect(curried(3, ph)(4)(1, ph)(2)).toEqual([1, 2, 3, 4]);
    expect(curried(ph, ph, 4)(ph, 3)(ph, 2)(1)).toEqual([1, 2, 3, 4]);
    expect(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1)).toEqual([1, 2, 3, 4]);
  });

  it('should persist placeholders', () => {
    const curried = curryRight(fn),
      ph = curried.placeholder,
      actual = curried('a', ph, ph, ph)('b')(ph)('c')('d');

    expect(actual).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should provide additional arguments after reaching the target arity', () => {
    const curried = curryRight(fn, 3);
    expect(curried(4)(1, 2, 3)).toEqual([1, 2, 3, 4]);
    expect(curried(4, 5)(1, 2, 3)).toEqual([1, 2, 3, 4, 5]);
    expect(curried(1, 2, 3, 4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should create a function with a `length` of `0`', () => {
    const curried = curryRight(fn);
    expect(curried.length).toBe(0);
    expect(curried(4).length).toBe(0);
    expect(curried(3, 4).length).toBe(0);

    const curried2 = curryRight(fn, 4);
    expect(curried2.length).toBe(0);
    expect(curried2(4).length).toBe(0);
    expect(curried2(3, 4).length).toBe(0);
  });

  it('should ensure `new curried` is an instance of `func`', () => {
    function Foo(value: unknown) {
      return value && object;
    }

    const curried = curryRight(Foo);
    const object = {};

    // @ts-expect-error - curried is a constructor
    expect(new curried(false) instanceof Foo);

    // @ts-expect-error - curried is a constructor
    expect(new curried(true)).toBe(object);

    function Bar(object: unknown, value: unknown) {
      return value && object;
    }

    const curriedBar = curryRight(Bar);
    expect(new (curriedBar(true))(object)).toBe(object);
  });

  it('should use `this` binding of function', () => {
    const fn = function (this: any, a: string | number, b: string | number, c: string | number) {
      const value = this || {};
      return [value[a], value[b], value[c]];
    };

    const object: any = { a: 1, b: 2, c: 3 },
      expected = [1, 2, 3];

    expect(curryRight(bind(fn, object), 3)('c')('b')('a')).toEqual(expected);
    expect(curryRight(bind(fn, object), 3)('b', 'c')('a')).toEqual(expected);
    expect(curryRight(bind(fn, object), 3)('a', 'b', 'c')).toEqual(expected);

    expect(bind(curryRight(fn), object)('c')('b')('a')).toEqual(Array(3));
    expect(bind(curryRight(fn), object)('b', 'c')('a')).toEqual(Array(3));
    expect(bind(curryRight(fn), object)('a', 'b', 'c')).toEqual(expected);

    object.curried = curryRight(fn);
    expect(object.curried('c')('b')('a')).toEqual(Array(3));
    expect(object.curried('b', 'c')('a')).toEqual(Array(3));
    expect(object.curried('a', 'b', 'c')).toEqual(expected);
  });

  it('should work with partialed methods', () => {
    const curried = curryRight(fn),
      expected = [1, 2, 3, 4];

    const a = partialRight(curried, 4),
      b = partialRight(a, 3),
      c = bind(b, null, 1),
      d = partial(b(2), 1);

    expect(c(2)).toEqual(expected);
    expect(d()).toEqual(expected);
  });

  it(`\`curryRight\` should work for function names that shadow those on \`Object.prototype\``, () => {
    const curried = curryRight(function hasOwnProperty(a: unknown, b: unknown) {
      return [a, b];
    });

    expect(curried(2)(1)).toEqual([1, 2]);
  });

  it(`\`curryRight\` should work as an iteratee for methods like \`map\``, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function fn(_a: unknown, _b: unknown) {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    }
    const array = [fn, fn, fn];
    const object = { a: fn, b: fn, c: fn };

    [array, object].forEach(collection => {
      const curries = map(collection, curryRight as (...args: any[]) => any),
        expected = map(collection, () => ['a', 'b']);

      const actual = map(curries, curried => curried('b')('a'));

      expect(actual).toEqual(expected);
    });
  });
});
