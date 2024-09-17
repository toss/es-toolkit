import { describe, it, expect } from 'vitest';
import { curry } from './curry';
import { bind } from './bind';
import { partial } from '../../function/partial';
import { partialRight } from '../../function/partialRight';

describe('curry', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown, _d: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should curry based on the number of arguments given', () => {
    const curried = curry(fn),
      expected = [1, 2, 3, 4];

    expect(curried(1)(2)(3)(4)).toEqual(expected);
    expect(curried(1, 2)(3, 4)).toEqual(expected);
    expect(curried(1, 2, 3, 4)).toEqual(expected);
  });

  it('should allow specifying `arity`', () => {
    const curried = curry(fn, 3),
      expected = [1, 2, 3];

    expect(curried(1)(2, 3)).toEqual(expected);
    expect(curried(1, 2)(3)).toEqual(expected);
    expect(curried(1, 2, 3)).toEqual(expected);
  });

  it('should coerce `arity` to an integer', () => {
    const values = ['0', 0.6, 'xyz'],
      expected = values.map(() => []);

    // @ts-expect-error - unusual arity type
    const actual = values.map(arity => curry(fn, arity)());

    expect(actual).toEqual(expected);
    // @ts-expect-error - unusual arity type
    expect(curry(fn, '2')(1)(2)).toEqual([1, 2]);
  });

  it('should support placeholders', () => {
    const curried = curry(fn),
      ph = curried.placeholder;

    expect(curried(1)(ph, 3)(ph, 4)(2)).toEqual([1, 2, 3, 4]);
    expect(curried(ph, 2)(1)(ph, 4)(3)).toEqual([1, 2, 3, 4]);
    expect(curried(ph, ph, 3)(ph, 2)(ph, 4)(1)).toEqual([1, 2, 3, 4]);
    expect(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1)).toEqual([1, 2, 3, 4]);
  });

  it('should persist placeholders', () => {
    const curried = curry(fn),
      ph = curried.placeholder,
      actual = curried(ph, ph, ph, 'd')('a')(ph)('b')('c');

    expect(actual).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should provide additional arguments after reaching the target arity', () => {
    const curried = curry(fn, 3);
    expect(curried(1)(2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(curried(1, 2)(3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(curried(1, 2, 3, 4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should create a function with a `length` of `0`', () => {
    const curried = curry(fn);
    expect(curried.length).toBe(0);
    expect(curried(1).length).toBe(0);
    expect(curried(1, 2).length).toBe(0);

    const curried2 = curry(fn, 4);
    expect(curried2.length).toBe(0);
    expect(curried2(1).length).toBe(0);
    expect(curried2(1, 2).length).toBe(0);
  });

  it('should ensure `new curried` is an instance of `func`', () => {
    function Foo(value: unknown) {
      return value && object;
    }

    const curried = curry(Foo);
    const object = {};

    // @ts-expect-error - curried is a constructor
    expect(new curried(false) instanceof Foo);

    // @ts-expect-error - curried is a constructor
    expect(new curried(true)).toBe(object);
  });

  it('should use `this` binding of function', () => {
    const fn = function (this: any, a: string | number, b: string | number, c: string | number) {
      const value = this || {};
      return [value[a], value[b], value[c]];
    };

    const object: any = { a: 1, b: 2, c: 3 },
      expected = [1, 2, 3];

    expect(curry(bind(fn, object), 3)('a')('b')('c')).toEqual(expected);
    expect(curry(bind(fn, object), 3)('a', 'b')('c')).toEqual(expected);
    expect(curry(bind(fn, object), 3)('a', 'b', 'c')).toEqual(expected);

    expect(bind(curry(fn), object)('a')('b')('c')).toEqual(Array(3));
    expect(bind(curry(fn), object)('a', 'b')('c')).toEqual(Array(3));
    expect(bind(curry(fn), object)('a', 'b', 'c')).toEqual(expected);

    object.curried = curry(fn);
    expect(object.curried('a')('b')('c')).toEqual(Array(3));
    expect(object.curried('a', 'b')('c')).toEqual(Array(3));
    expect(object.curried('a', 'b', 'c')).toEqual(expected);
  });

  it('should work with partialed methods', () => {
    const curried = curry(fn),
      expected = [1, 2, 3, 4];

    const a = partial(curried, 1),
      b = bind(a, null, 2),
      c = partialRight(b, 4),
      d = partialRight(b(3), 4);

    expect(c(3)).toEqual(expected);
    expect(d()).toEqual(expected);
  });

  it(`\`curry\` should work for function names that shadow those on \`Object.prototype\``, () => {
    const curried = curry(function hasOwnProperty(a: unknown, b: unknown) {
      return [a, b];
    });

    expect(curried(1)(2)).toEqual([1, 2]);
  });

  it(`\`curry\` should work as an iteratee for methods like \`map\``, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function fn(_a: unknown, _b: unknown) {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    }
    const array = [fn, fn, fn];
    // TODO test object like this
    // const object = { 'a': fn, 'b': fn, 'c': fn };

    [array].forEach(collection => {
      const curries = collection.map(curry),
        expected = collection.map(() => ['a', 'b']);

      const actual = curries.map(curried => curried('a')('b'));

      expect(actual).toEqual(expected);
    });
  });
});
